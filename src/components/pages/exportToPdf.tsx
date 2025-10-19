import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { User } from "../../app/page";

export function exportToPDF(usersData: User[]) {
  const doc = new jsPDF();
  doc.text("Users Data", 14, 10);

  const tableData = usersData.map((user) => [user.name, user.email, user.age]);

  autoTable(doc, {
    head: [["Name", "Email", "Age"]],
    body: tableData,
  });

  doc.save("users-data.pdf");
}
