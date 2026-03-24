# Organize Files By Type

This tool scans a directory and moves files into folders based on their file extensions.

Examples:
- `.jpg`, `.png` -> `Images`
- `.pdf`, `.docx`, `.txt` -> `Documents`
- unknown extensions -> `Others`

It also handles duplicate filenames safely. If a file with the same name already exists in the destination folder, the script creates a new name like `file_1.pdf` instead of overwriting the existing file.

## Requirements

- Python 3.8 or newer

## Files

- `organize_files.py`: the main script

## How To Run

Open a terminal in the `organize_files_by_type` folder and run:

```bash
python organize_files.py
```

This organizes files in the current directory.

To organize a different folder, pass the folder path:

```bash
python organize_files.py "C:\path\to\target-folder"
```

## What The Script Does

The script:

- scans the target directory
- skips subfolders
- creates category folders when needed
- moves files into the matching folder
- renames duplicates safely

## Default Categories

The script currently organizes files into these folders:

- `Images`
- `Documents`
- `Audio`
- `Videos`
- `Archives`
- `Code`
- `Others`

## Example

Before:

```text
Downloads/
  photo.jpg
  resume.pdf
  script.py
  notes.xyz
```

After:

```text
Downloads/
  Images/
    photo.jpg
  Documents/
    resume.pdf
  Code/
    script.py
  Others/
    notes.xyz
```

## Notes

- File type rules are defined in `FOLDER_MAP` inside `organize_files.py`.
- You can extend `FOLDER_MAP` to support more file extensions.
- The script moves files, so the original files will no longer remain in their old location after organization.
