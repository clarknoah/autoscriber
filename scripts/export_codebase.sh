#!/bin/bash

# Check if the required arguments are provided
if [ $# -lt 4 ]; then
    echo "Usage: $0 <directory> <output_file> <search_type> <search_pattern> [exclusion_pattern1] [exclusion_pattern2] ..."
    echo "  <search_type>: 'regex' or 'name'"
    exit 1
fi

# Assign the input arguments to variables
directory="$1"
output_file=./local_utilities/"$2"
search_type="$3"
search_pattern="$4"

# Read exclusion patterns from command line arguments
exclude_patterns=()
shift 4 # Skip the first four arguments (directory, output, search type, search pattern)
while [ $# -gt 0 ]; do
    exclude_patterns+=("$1")
    shift
done

# Check if the directory exists
if [ ! -d "$directory" ]; then
    echo "Directory '$directory' does not exist."
    exit 1
fi

# Create or truncate the output file
> "$output_file"

echo "Autoscriber Codebase Directory Structure (Excluding certain folders)" >> "$output_file"
tree -I 'node_modules|dist|bin|data|logs'>> "$output_file"

echo " " >> "$output_file"
echo "Individual Codebase Files" >> "$output_file"
echo " " >> "$output_file"

# Recursively find files in the directory and its children folders
# based on the search type and pattern, and append their contents to the output file
# with the relative file path
case "$search_type" in
    regex)
        find "$directory" -type f -regex "$search_pattern" -print0 | while IFS= read -r -d $'\0' file; do
            
            # Check for exclusion patterns
            exclude=false
            for pattern in "${exclude_patterns[@]}"; do
                if [[ "$file" =~ $pattern ]]; then
                    exclude=true
                    break
                fi
            done

            if ! $exclude; then
                relative_path="${file#$directory/}"
                echo "//File path: $relative_path" >> "$output_file"
                cat "$file" >> "$output_file"
                echo "" >> "$output_file"  # Add a blank line between files
            fi 
        done
        ;;
    name)
        find "$directory" -type f -name "$search_pattern" -print0 | while IFS= read -r -d $'\0' file; do
            
            # Check for exclusion patterns
            exclude=false
            for pattern in "${exclude_patterns[@]}"; do
                if [[ "$file" =~ $pattern ]]; then
                    exclude=true
                    break
                fi
            done

            if ! $exclude; then
                relative_path="${file#$directory/}"
                echo "//File path: $relative_path" >> "$output_file"
                cat "$file" >> "$output_file"
                echo "" >> "$output_file"  # Add a blank line between files
            fi 
        done
        ;;
    *)
        echo "Invalid search type. Use 'regex' or 'name'."
        exit 1
        ;;
esac

echo "Combined file created: $output_file"


# yarn export-codebase ./ codebase.txt name "*.ts" "dist" "bin" "node_modules" "local_utilities" ".husky" ".vscode" ".git" "backups" "ios" "ogm-types" "gql"