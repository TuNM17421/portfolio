# Portfolio

Portfolio cá nhân xây dựng bằng **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4** và **next-intl** (song ngữ Việt/Anh).

## Tính năng

- 🌐 Song ngữ Tiếng Việt / English (next-intl, định tuyến `/vi`, `/en`)
- 🎨 Dark mode tự động theo hệ điều hành (semantic design tokens)
- 📱 Responsive, tối ưu SEO (metadata theo ngôn ngữ)
- 📇 4 phần: Giới thiệu · Dự án · Kỹ năng & Kinh nghiệm · Liên hệ
- ✅ Form liên hệ có validate bằng Zod (client + API route)

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000 (tự chuyển hướng sang `/vi`).

## Tùy chỉnh nội dung

| Muốn sửa | File |
| --- | --- |
| Chữ hiển thị (tên, giới thiệu, dự án...) | `messages/vi.json`, `messages/en.json` |
| Danh sách kỹ năng | `src/data/skills.ts` |
| Màu sắc / theme | `src/app/globals.css` (các biến `--*`) |
| Ngôn ngữ hỗ trợ | `src/i18n/routing.ts` |

## Build

```bash
npm run build
npm start
```

## Deploy lên Vercel

1. Đẩy code lên GitHub/GitLab/Bitbucket.
2. Vào [vercel.com/new](https://vercel.com/new), import repository.
3. Vercel tự nhận diện Next.js — bấm **Deploy**, không cần cấu hình thêm.

Hoặc dùng CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```
