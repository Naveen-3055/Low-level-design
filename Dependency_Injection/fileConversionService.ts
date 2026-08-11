class FileReader {
    read(filePath: string): string {
        console.log("Reading file: " + filePath);
        const content = "name,age,city";
        console.log("Content: " + content);
        return content;
    }
}

class FormatParser {
    parse(content: string, targetFormat: string): string {
        console.log("Parsing content to " + targetFormat + " format");
        const parsed = '[{"name":"Alice","age":30,"city":"NYC"}]';
        console.log("Parsed: " + parsed);
        return parsed;
    }
}

class FileWriter {
    write(filePath: string, content: string): void {
        console.log("Writing to file: " + filePath);
    }
}

class FileConverter {
    convert(sourcePath: string, targetPath: string, targetFormat: string,
            reader: FileReader, parser: FormatParser, writer: FileWriter): void {
        const content = reader.read(sourcePath);
        const parsed = parser.parse(content, targetFormat);
        writer.write(targetPath, parsed);
        console.log("File conversion complete: " + sourcePath + " -> " + targetPath);
    }
}

const converter = new FileConverter();

const reader = new FileReader();
const parser = new FormatParser();
const writer = new FileWriter();

converter.convert("data.csv", "output.json", "JSON", reader, parser, writer);

export {};