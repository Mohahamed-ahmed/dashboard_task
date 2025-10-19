import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { User } from "../../app/page";

export function exportToExcel(usersData: User[]) {
  const worksheet = XLSX.utils.json_to_sheet(usersData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "users-data.xlsx");
}
