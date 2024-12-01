import { createObjectCsvWriter } from "csv-writer";

interface CsvHeader {
  id: string;
  title: string;
}

export class CsvAppender<T extends Record<string, any>> {
  private csvWriter: ReturnType<typeof createObjectCsvWriter>;

  constructor(private filePath: string, private headers: CsvHeader[]) {
    this.csvWriter = createObjectCsvWriter({
      path: this.filePath,
      header: this.headers,
      append: false,
    });
  }

  async appendRecords(records: T[]): Promise<void> {
    await this.csvWriter.writeRecords(records);
    console.log(`Appended ${records.length} records`);
  }
}
