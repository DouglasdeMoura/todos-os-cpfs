#!/bin/bash

# Ensure you're in the correct directory
cd ./batches

# Loop through each text file
for file in *; do
    # Add the file to staging
    git add "$file"
    
    # # Commit the file with a message
    git commit -m "chore: adiciona $file"
    
    # # Push the commit to the repository
    git push origin main
done
