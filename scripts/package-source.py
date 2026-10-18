"""Package corresponding application source without credentials, runtime data or build artifacts."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parent.parent
paths = ['.github', 'src', 'scripts', 'tests', 'licenses', 'public/fonts', 'public/stickers', 'public/branding']
files = ['package.json', 'package-lock.json', 'index.html', 'tsconfig.json', 'vite.config.ts', 'playwright.config.ts', 'README.md', 'LICENSE.md', 'THIRD_PARTY_NOTICES.md', '.gitignore']
with ZipFile(root / 'public/sticker-source.zip', 'w', ZIP_DEFLATED) as archive:
    for name in files:
        archive.write(root / name, 'sticker/' + name)
    for name in paths:
        for file in sorted((root / name).rglob('*')):
            if file.is_file():
                archive.write(file, 'sticker/' + str(file.relative_to(root)))
print('Packaged corresponding source: public/sticker-source.zip')
