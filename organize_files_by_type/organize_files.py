from __future__ import annotations

import argparse
import shutil
from pathlib import Path


FOLDER_MAP = {
    ".jpg": "Images",
    ".jpeg": "Images",
    ".png": "Images",
    ".gif": "Images",
    ".bmp": "Images",
    ".webp": "Images",
    ".svg": "Images",
    ".pdf": "Documents",
    ".doc": "Documents",
    ".docx": "Documents",
    ".txt": "Documents",
    ".rtf": "Documents",
    ".csv": "Documents",
    ".xls": "Documents",
    ".xlsx": "Documents",
    ".ppt": "Documents",
    ".pptx": "Documents",
    ".mp3": "Audio",
    ".wav": "Audio",
    ".flac": "Audio",
    ".aac": "Audio",
    ".mp4": "Videos",
    ".mkv": "Videos",
    ".mov": "Videos",
    ".avi": "Videos",
    ".zip": "Archives",
    ".rar": "Archives",
    ".7z": "Archives",
    ".tar": "Archives",
    ".gz": "Archives",
    ".py": "Code",
    ".js": "Code",
    ".ts": "Code",
    ".html": "Code",
    ".css": "Code",
    ".json": "Code",
}


def unique_destination(destination: Path) -> Path:
    """Return a non-conflicting path by appending a counter when needed."""
    if not destination.exists():
        return destination

    stem = destination.stem
    suffix = destination.suffix
    parent = destination.parent
    counter = 1

    while True:
        candidate = parent / f"{stem}_{counter}{suffix}"
        if not candidate.exists():
            return candidate
        counter += 1


def folder_for_file(file_path: Path) -> str:
    """Choose a folder name from the file extension."""
    return FOLDER_MAP.get(file_path.suffix.lower(), "Others")


def organize_directory(directory: Path) -> int:
    if not directory.exists():
        raise FileNotFoundError(f"Directory does not exist: {directory}")
    if not directory.is_dir():
        raise NotADirectoryError(f"Path is not a directory: {directory}")

    moved_files = 0

    for item in directory.iterdir():
        if not item.is_file():
            continue

        target_folder = directory / folder_for_file(item)
        target_folder.mkdir(exist_ok=True)

        destination = unique_destination(target_folder / item.name)
        shutil.move(str(item), str(destination))
        moved_files += 1
        print(f"Moved '{item.name}' -> '{destination.relative_to(directory)}'")

    return moved_files


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Move files into folders based on their extensions."
    )
    parser.add_argument(
        "directory",
        nargs="?",
        default=".",
        help="Directory to organize. Defaults to the current directory.",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    directory = Path(args.directory).expanduser().resolve()

    moved_files = organize_directory(directory)
    print(f"\nDone. Moved {moved_files} file(s) in '{directory}'.")


if __name__ == "__main__":
    main()
