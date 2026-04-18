# FGD-THPT — Học Cùng AI · Learneris

Bộ tài liệu và công cụ tổ chức **Focus Group Discussion (FGD)** để đánh giá hiệu quả chương trình AI lớp 10 năm học 2025–2026, triển khai tại trường Bình Chiểu.

---

## 🔗 Links quan trọng

| Tài nguyên | Link | Ghi chú |
|---|---|---|
| 📋 **Survey (giáo viên điền)** | `https://mia-learneris.github.io/FGD-THPT/` | Gửi link này cho GV — sau khi bật GitHub Pages |
| 📊 **Google Sheet — kết quả** | [FGD Survey Responses 2025-2026](https://docs.google.com/spreadsheets/d/1vje2hA8ToCr8pJPX8-4UcDmX0-uM7lJ8PyzOcdR9j6A/edit) | Tự động cập nhật khi GV submit |
| ⚙️ **Apps Script (webhook)** | [Script Editor](https://script.google.com/u/0/home/projects/1gsmQLqai2j5IU4ljwqbF5nD4ftSviS6sYjcZZfi_HZexcXxxixEJV8Ll/edit) | Nhận data từ survey → ghi vào Sheet |
| 🎙️ **FGD Live Notes** | [`fgd_live_notes.html`](https://claude.ai/public/artifacts/a29b9fc3-9b54-4cc3-ab1e-4e6f913fc911) | Mở khi conduct FGD — ghi chép trực tiếp |
| 📁 **GitHub Repo** | [mia-learneris/FGD-THPT](https://github.com/mia-learneris/FGD-THPT) | Repo này |

> **Lưu ý:** Survey link và Live Notes link chỉ hoạt động sau khi bật GitHub Pages (Settings → Pages → Deploy from branch → main).

---

## 📁 Cấu trúc files

```
FGD-THPT/
├── index.html              # Survey screening cho giáo viên (giao diện chính)
├── fgd_live_notes.html     # Tool ghi chép live trong buổi FGD
├── SheetWebhook.gs         # Apps Script — nhận POST từ survey, ghi vào Google Sheet
├── DEPLOY_GUIDE.md         # Hướng dẫn deploy chi tiết từng bước
└── README.md               # File này
```

---

## 🗓️ Timeline & trạng thái

| Mốc | Thời gian | Trạng thái |
|---|---|---|
| Gửi survey cho giáo viên | Tháng 4/2026 | ⏳ Chờ deploy |
| Thu thập phản hồi | 1–2 tuần trước FGD | ⏳ Chờ |
| Conduct FGD online | Cuối tháng 4 – đầu tháng 5/2026 | ⏳ Chờ |
| Phân tích & báo cáo | Sau FGD ~1 tuần | ⏳ Chờ |

---

## 🧑‍🏫 Thành phần giáo viên

Trường **Bình Chiểu** — 8 giáo viên đang triển khai chương trình THPT-0

---

## 🔄 Luồng hoạt động

```
1. Giáo viên mở link survey (index.html trên GitHub Pages)
        ↓
2. Điền form (~12 phút) → bấm "Gửi câu trả lời"
        ↓
3. Survey gửi POST đến Apps Script webhook
        ↓
4. Apps Script ghi dữ liệu vào tab "FGD_Responses" trên Google Sheet
        + Gửi email thông báo cho team
        ↓
5. Team xem kết quả realtime trên Google Sheet
        ↓
6. Trước buổi FGD: tóm tắt kết quả survey → đưa vào câu hỏi thảo luận
        ↓
7. Conduct FGD online (75 phút) — dùng fgd_live_notes.html để ghi chép
        ↓
8. Sau FGD: export notes (.txt hoặc .csv) → phân tích → báo cáo nội bộ
```

---

## 🛠️ Setup nhanh (nếu chưa deploy)

Xem `DEPLOY_GUIDE.md` để làm từng bước. Tóm tắt:

1. **Apps Script** đã deploy tại link trên — webhook URL đã được nhúng vào `index.html`
2. **GitHub Pages**: Settings → Pages → Source: Deploy from branch → `main` / `(root)` → Save
3. **Gửi link** `https://mia-learneris.github.io/FGD-THPT/` cho giáo viên qua Zalo/Messenger

---

## 📌 Ghi chú kỹ thuật

- Survey gửi data qua `fetch()` với `mode: 'no-cors'` đến Apps Script Web App URL
- Fallback: nếu mất mạng, nút "Tải CSV" hiện ra để giáo viên tải thủ công và gửi về team
- FGD Live Notes lưu ghi chép vào `sessionStorage` — export `.txt` hoặc `.csv` cuối buổi
- Google Sheet tab `FGD_Responses` được tạo tự động lần đầu có submission

---

*Learneris · Học Cùng AI THPT · 2025–2026*
