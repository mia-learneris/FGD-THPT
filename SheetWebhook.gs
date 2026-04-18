// ============================================================
// FGD Survey Webhook — Google Apps Script
// Học Cùng AI THPT · Learneris
// ============================================================
// CÁCH DEPLOY:
// 1. Mở Google Sheet mới → Extensions → Apps Script
// 2. Paste toàn bộ file này vào editor, xoá code mặc định
// 3. Bấm Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy "Web app URL" → dán vào SHEET_WEBHOOK_URL trong file HTML
// ============================================================

const SHEET_NAME = 'FGD_Responses';
const NOTIFY_EMAIL = 'YOUR_EMAIL@learneris.com'; // đổi thành email nhận thông báo

// Các cột theo thứ tự — phải khớp với collectData() trong HTML
const COLUMNS = [
  'Timestamp', 'ID',
  'A1_Mon_day', 'A2_Nen_tang_AI', 'A3_So_lop_HS', 'A4_Onboarding',
  'B1_Thoi_gian_chuan_bi', 'B2_Kho_truyen_dat', 'B2_Kho_khac',
  'B3_Tai_lieu_du_khong',
  'C1_Ranking_chu_de', 'C2_Bai_ngoai_tam', 'C3_Thieu_gi',
  'D1_Ranking_cong_cu', 'D2_Su_co_ky_thuat', 'D3_Tiet_kiem_tg',
  'E1_Hao_hung_HS', 'E2_Nhom_kho_theo', 'E2_Khac', 'E3_Ap_dung_ngoai',
  'F1_Mo_ta_chuong_trinh', 'F2_Nhan_nhu_Learneris'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    writeRow(data);
    if (NOTIFY_EMAIL) sendNotification(data);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Cho phép test từ trình duyệt (GET request)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Webhook đang hoạt động' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function writeRow(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  // Tạo sheet + header nếu chưa có
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
    // Format header
    const headerRange = sheet.getRange(1, 1, 1, COLUMNS.length);
    headerRange.setBackground('#2563EB');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // Map data vào đúng thứ tự cột
  const row = [
    data.timestamp || new Date().toLocaleString('vi-VN'),
    data.id || Date.now(),
    data.a1 || '',
    data.a2 || '',
    data.a3 || '',
    data.a4 || '',
    data.b1 || '',
    data.b2 || '',
    data.b2_other || '',
    data.b3 || '',
    data.c1_ranking || '',
    data.c2 || '',
    data.c3 || '',
    data.d1_ranking || '',
    data.d2 || '',
    data.d3 || '',
    data.e1 || '',
    data.e2 || '',
    data.e2_other || '',
    data.e3 || '',
    data.f1 || '',
    data.f2 || ''
  ];

  sheet.appendRow(row);

  // Tự động điều chỉnh độ rộng cột
  sheet.autoResizeColumns(1, COLUMNS.length);
}

function sendNotification(data) {
  const subject = '[FGD Survey] Có phản hồi mới từ giáo viên Bình Chiểu';
  const body = `
Có một giáo viên vừa hoàn thành Screening Survey FGD.

Thời gian: ${data.timestamp || 'Không rõ'}
Môn dạy: ${data.a1 || '—'}
Nền tảng AI ban đầu: ${data.a2 || '—'}

Xem toàn bộ phản hồi tại Google Sheet:
${SpreadsheetApp.getActiveSpreadsheet().getUrl()}

---
Tự động gửi từ hệ thống FGD Survey · Học Cùng AI THPT
  `.trim();

  GmailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}
