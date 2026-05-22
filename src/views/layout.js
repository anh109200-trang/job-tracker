// views/layout.js

/**
 * Layout chung bọc toàn bộ ứng dụng (Navbar + Footer)
 * @param {string} content - Nội dung HTML động của trang chủ, đăng nhập hoặc đăng ký
 * @param {string|null} user - Username của người dùng hiện tại (currentUser)
 * @returns {string} Toàn bộ cấu trúc trang HTML
 */
const renderLayout = (content, user = null) => {
    
    // Khởi tạo vùng hiển thị góc phải Navbar
    let authZoneHtml = '';

    if (user) {
        // TỨC LÀ ĐÃ ĐĂNG NHẬP: Hiển thị tên người dùng và Form nút Đăng xuất
        authZoneHtml = `
            <div class="flex items-center gap-6 animate-[fadeIn_0.2s_ease-out]">
                <div class="hidden md:block text-right">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Người dùng</p>
                    <p class="text-sm font-bold text-slate-800">${user}</p>
                </div>
                
                <form action="/auth/login" method="POST" class="m-0">
                    <input type="hidden" name="action" value="logout">
                    <button type="submit" class="flex items-center gap-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-4 py-2.5 rounded-xl transition-all active:scale-[0.98]">
                        <i class="fas fa-sign-out-alt"></i> Đăng xuất
                    </button>
                </form>
            </div>
        `;
    } else {
        // CHƯA ĐĂNG NHẬP: Hiển thị cặp nút Đăng nhập / Đăng ký ban đầu
        authZoneHtml = `
            <div class="flex items-center gap-3">
                <a href="/auth/login" class="text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors">
                    Đăng nhập
                </a>
                <a href="/auth/register" class="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-md shadow-blue-500/10 transition-all active:scale-[0.98]">
                    Đăng ký
                </a>
            </div>
        `;
    }

    // Trả về cấu trúc cây HTML hoàn chỉnh
    return `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>JobTracker.io - Quản lý ứng tuyển công việc</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        </head>
        <body class="bg-slate-50/50 min-h-screen font-sans antialiased text-slate-900 flex flex-col">

            <nav class="bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm sticky top-0 z-50 transition-all">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    
                    <a href="/" class="flex items-center gap-2.5 group">
                        <div class="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center rounded-xl shadow-lg shadow-blue-500/20 transform group-hover:scale-105 transition-all">
                            <i class="fas fa-briefcase text-sm"></i>
                        </div>
                        <span class="text-lg font-black tracking-tight text-slate-900">
                            JobTracker<span class="text-blue-600">.io</span>
                        </span>
                    </a>

                    ${authZoneHtml}

                </div>
            </nav>

            <main class="flex-grow py-6">
                ${content}
            </main>

            <footer class="bg-white border-t border-slate-100 py-4 mt-12">
                <div class="max-w-7xl mx-auto px-4 text-center text-xs font-medium text-slate-400">
                    &copy; 2026 JobTracker.io. Hệ thống theo dõi hồ sơ xin việc cá nhân.
                </div>
            </footer>

        </body>
        </html>
    `;
};

module.exports = renderLayout;