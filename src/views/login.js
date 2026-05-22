// views/login.js

const renderLogin = () => {
    return `
        <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
            <div class="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100">
                <div class="text-center mb-8">
                    <h2 class="text-2xl font-black text-slate-950 tracking-tight sm:text-3xl">Đăng nhập tài khoản</h2>
                    <p class="mt-2 text-sm text-slate-500">Quản lý và bứt phá sự nghiệp cùng JobTracker</p>
                </div>
                
                <form class="space-y-5" action="/auth/login" method="POST">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Địa chỉ Email</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                <i class="fas fa-envelope text-sm"></i>
                            </span>
                            <input name="email" type="email" required class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-150" placeholder="name@company.com">
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-1.5">
                            <label class="block text-xs font-bold uppercase tracking-wider text-slate-600">Mật khẩu</label>
                            <a href="#" class="text-xs font-semibold text-blue-600 hover:underline">Quên mật khẩu?</a>
                        </div>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                <i class="fas fa-lock text-sm"></i>
                            </span>
                            <input name="password" type="password" required class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-150" placeholder="••••••••">
                        </div>
                    </div>

                    <button type="submit" class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-[0.99]">
                        Đăng nhập
                    </button>
                </form>

                <div class="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
                    Chưa có tài khoản? <a href="/auth/register" class="font-bold text-blue-600 hover:text-blue-700">Đăng ký miễn phí</a>
                </div>
            </div>
        </div>
    `;
};

module.exports = renderLogin;