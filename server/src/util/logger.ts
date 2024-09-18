import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { createLogger, format, transports } from "winston";
import Transport from "winston-transport";
import { env } from "config/globals";
import { S3 } from "aws-sdk";
//import { AWSS3Uploader } from "services/uploads/awsS3";
import { format as fnsFormat } from "date-fns";
const logDir = "logs";

// Create the log directory if it does not exist
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const errorLog = join(logDir, "error.log");
const requestLog = join(logDir, "request.log");
const combinedLog = join(logDir, "combined.log");
const exceptionsLog = join(logDir, "exceptions.log");

// 2. Create a custom Winston transport to upload logs to AWS S3
// class S3Transport extends Transport {
//   s3: S3;
//   bucket: string;
//   folder: string;

//   constructor(options: any) {
//     super(options);
//     this.s3 = new S3();
//     this.bucket = options.bucket;
//     this.folder = options.folder;
//   }

//   async log(info: any, callback: () => void) {
//     try {
//       setImmediate(() => this.emit("logged", info));

//       const logMessage = JSON.stringify(info.message);
//       const timestamp = fnsFormat(
//         info.message?.created_at
//           ? new Date(info.message?.created_at)
//           : new Date(),
//         "yyyy-MM-dd HH:mm:ss.SSS"
//       );
//       const key = `${this.folder}/${timestamp}.json`;

//       const upload = new AWSS3Uploader();
//       upload.uploadAuditLogObject({
//         object: logMessage,
//         fileName: key,
//       });

//       callback();
//     } catch (error) {
//       console.error("Error uploading to S3:", error);
//       callback();
//     }
//   }
// }

// // 3. Create logger configuration for logging to AWS S3 bucket
// export const s3EventTransport = new S3Transport({
//   level: "info",
//   bucket: env.aws.s3Params.auditBucket!,
//   folder: "event_logs",
// });

// export const s3EmailTransport = new S3Transport({
//   level: "info",
//   bucket: env.aws.s3Params.auditBucket!,
//   folder: "email_logs",
// });

// let s3EmailTransports: any[] = [
//   new transports.File({
//     filename: combinedLog,
//   }),
// ];

// let s3EventTransports: any[] = [
//   new transports.File({
//     filename: combinedLog,
//   }),
// ];



const isRequest = format((info, opts) => {
  if (info.isRequest) {
    return info;
  }
  return false;
});

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: errorLog,
      level: "error",
    }),
    new transports.File({
      filename: requestLog,
      format: format.combine(isRequest()),
    }),
    new transports.File({
      filename: combinedLog,
    }),
    // s3Transport
  ],
  exceptionHandlers: [
    new transports.File({
      filename: exceptionsLog,
    }),
  ],
});

if (env.NODE_ENV !== "production" || process.env.CONSOLE_LOGGER) {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      level: "debug",
    })
  );
}
