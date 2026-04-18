# Hướng dẫn Deploy — FGD Survey
## Học Cùng AI THPT · Learneris

Tổng thời gian setup: **~25 phút**  
Yêu cầu: tài khoản Google + tài khoản GitHub Learneris

---

## Bước 1 — Tạo Google Sheet & deploy Apps Script (~10 phút)

### 1.1 Tạo Sheet mới
1. Vào [sheets.google.com](https://sheets.google.com) → **Blank spreadsheet**
2. Đặt tên: `FGD Survey Responses 2025-2026`

### 1.2 Mở Apps Script
1. Trong Sheet vừa tạo: **Extensions → Apps Script**
2. Xoá toàn bộ code mặc định trong editor
3. Copy toàn bộ nội dung file `SheetWebhook.gs` và paste vào
4. Tìm dòng này và đổi email:
   ```
   const NOTIFY_EMAIL = 'YOUR_EMAIL@learneris.com';
   ```
   Đổi thành email thật của team (ví dụ: `kels@learneris.com`)

### 1.3 Deploy Web App
1. Bấm **Deploy → New deployment**
2. Bấm icon ⚙️ (gear) cạnh "Select type" → chọn **Web app**
3. Điền thông tin:
   - Description: `FGD Survey Webhook v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Bấm **Deploy**
5. Google sẽ hỏi quyền truy cập → bấm **Authorize access** → đăng nhập Google → **Allow**
6. Copy **Web app URL** — trông như thế này:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
   ⚠️ Lưu URL này lại, cần dùng ở Bước 2.

### 1.4 Test webhook
Dán URL vào trình duyệt → nếu thấy `{"status":"ok","message":"Webhook đang hoạt động"}` là thành công.

---

## Bước 2 — Cập nhật URL vào file HTML (~2 phút)

Mở file `survey_screening_v2.html` bằng bất kỳ text editor nào (VS Code, Notepad++...).

Tìm dòng này (gần cuối file, trong thẻ `<script>`):
```javascript
const SHEET_WEBHOOK_URL = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
```

Thay bằng URL vừa copy ở Bước 1.3:
```javascript
const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
```

Lưu file.

---

## Bước 3 — Deploy lên GitHub Pages (~10 phút)

### 3.1 Tạo repository
1. Vào GitHub của Learneris → **New repository**
2. Đặt tên: `fgd-survey-2026` (hoặc tên bất kỳ)
3. Visibility: **Private** (để bảo mật)
4. Bấm **Create repository**

### 3.2 Upload file
Cách nhanh nhất — dùng giao diện web GitHub:
1. Trong repo vừa tạo → bấm **Add file → Upload files**
2. Upload file `survey_screening_v2.html`
3. **Quan trọng:** Đổi tên file thành `index.html` khi upload
   (GitHub Pages cần file tên `index.html` làm trang chính)
4. Commit message: `Initial deploy - FGD Survey`
5. Bấm **Commit changes**

### 3.3 Bật GitHub Pages
1. Vào **Settings** của repository
2. Chọn **Pages** ở sidebar trái
3. Source: **Deploy from a branch**
4. Branch: `main` / `(root)` → **Save**
5. Chờ 1–2 phút → GitHub sẽ hiện URL:
   ```
   https://learneris.github.io/fgd-survey-2026/
   ```

> **Lưu ý Private repo:** GitHub Pages trên repo private yêu cầu GitHub Pro/Team.  
> Nếu chưa có, 2 lựa chọn:
> - Đổi repo thành **Public** (survey không có dữ liệu nhạy cảm nên ổn)
> - Hoặc dùng [Netlify](https://netlify.com) thay thế — kéo thả file `index.html` vào là xong, miễn phí hoàn toàn

---

## Bước 4 — Gửi link cho giáo viên

Gửi URL GitHub Pages qua Zalo/Messenger nhóm giáo viên:

```
Thầy/cô ơi, mình có 1 form ngắn (~12 phút) để chuẩn bị cho buổi 
thảo luận FGD sắp tới. Thầy/cô điền trước ngày [DATE] nhé ạ:

🔗 [GITHUB_PAGES_URL]

Không cần đăng nhập, câu trả lời bảo mật và chỉ dùng nội bộ.
Cảm ơn thầy/cô nhiều ạ!
```

---

## Quy trình khi có phản hồi

Mỗi khi giáo viên bấm **Gửi câu trả lời**:

1. Dữ liệu tự động vào **Google Sheet** (tab `FGD_Responses`)
2. Team nhận **email thông báo** với tóm tắt ngắn
3. Giáo viên thấy nút "Tải CSV" hiện ra — để tải backup nếu muốn

---

## Troubleshooting

| Vấn đề | Nguyên nhân | Cách xử lý |
|--------|-------------|------------|
| Bấm Gửi không có gì xảy ra | Chưa điền `SHEET_WEBHOOK_URL` | Kiểm tra lại Bước 2 |
| Gửi thành công nhưng Sheet trống | Apps Script chưa có quyền | Re-deploy với "Authorize access" |
| GitHub Pages báo 404 | File không tên `index.html` | Đổi tên file trong repo |
| Email thông báo không đến | Email sai hoặc Gmail block | Kiểm tra spam, verify email trong script |

---

## Cập nhật survey (nếu cần chỉnh câu hỏi sau này)

1. Chỉnh file `survey_screening_v2.html` trên máy
2. Vào GitHub repo → **Add file → Upload files** → upload lại file, đặt tên `index.html`
3. GitHub Pages tự cập nhật sau 1–2 phút

---

*Tạo bởi Learneris · Học Cùng AI THPT · 2025–2026*
