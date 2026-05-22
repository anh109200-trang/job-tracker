// views/index.js

/**
 * Hàm hiển thị giao diện trang chủ chia 2 bên bằng Tailwind CSS
 * @param {Array} jobs - Danh sách công việc
 * @param {number} currentPage - Trang hiện tại
 * @param {number} pages - Tổng số trang
 * @returns {string} Đoạn mã HTML hoàn chỉnh
 */
const renderIndex = (jobs = [], currentPage = 1, pages = 1) => {
    
    // 1. Tạo chuỗi HTML hiển thị danh sách các Job trong Table
    let tableRows = '';
    if (jobs.length === 0) {
        tableRows = `
            <tr>
                <td colspan="6" class="px-6 py-16 text-center text-sm text-slate-500">
                    <div class="flex flex-col items-center justify-center gap-3">
                        <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 text-2xl">
                            <i class="fas fa-folder-open"></i>
                        </div>
                        <p class="font-medium text-slate-400">Chưa có công việc nào được theo dõi</p>
                    </div>
                </td>
            </tr>
        `;
    } else {
        jobs.forEach((job) => {
            let statusClass = 'bg-slate-100 text-slate-700';
            if (job.status === 'Đang chờ') statusClass = 'bg-amber-50 text-amber-700 border-amber-200';
            if (job.status === 'Phỏng vấn') statusClass = 'bg-blue-50 text-blue-700 border-blue-200';
            if (job.status === 'Đã đậu') statusClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            if (job.status === 'Từ chối') statusClass = 'bg-rose-50 text-rose-700 border-rose-200';

            tableRows += `
                <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
                    <td class="px-6 py-4 text-sm font-semibold text-slate-900">${job.title}</td>
                    <td class="px-6 py-4 text-sm text-slate-600">${job.company}</td>
                    <td class="px-6 py-4 text-sm text-slate-600">${job.applicantName || '---'}</td>
                    <td class="px-6 py-4 text-sm text-slate-500">
                        <div class="text-slate-700 font-medium">${job.phone || '---'}</div>
                        <div class="text-xs text-slate-400 mt-0.5">${job.address || ''}</div>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <form action="/jobs/update-status/${job._id}" method="POST" class="inline-block">
                            <select name="status" onchange="this.form.submit()" class="text-xs font-bold px-2.5 py-1.5 rounded-xl border ${statusClass} focus:outline-none focus:ring-4 focus:ring-slate-100 cursor-pointer transition-all">
                                <option value="Đang chờ" ${job.status === 'Đang chờ' ? 'selected' : ''}>⏳ Đang chờ</option>
                                <option value="Phỏng vấn" ${job.status === 'Phỏng vấn' ? 'selected' : ''}>💬 Phỏng vấn</option>
                                <option value="Đã đậu" ${job.status === 'Đã đậu' ? 'selected' : ''}>🎉 Đã đậu</option>
                                <option value="Từ chối" ${job.status === 'Từ chối' ? 'selected' : ''}>❌ Từ chối</option>
                            </select>
                        </form>
                    </td>
                    <td class="px-6 py-4 text-right text-sm font-medium flex items-center gap-2 justify-end">
                        
                        <button onclick="fillFormToEdit('${job._id}', '${job.title}', '${job.company}', '${job.applicantName || ''}', '${job.phone || ''}', '${job.address || ''}')" class="text-slate-400 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 inline-block transition-colors" title="Sửa thông tin">
                            <i class="fas fa-edit text-xs"></i>
                        </button>

                        <a href="/jobs/delete/${job._id}" onclick="return confirm('Bạn có chắc chắn muốn xóa công việc này không?')" class="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 inline-block transition-colors" title="Xóa">
                            <i class="fas fa-trash-alt text-xs"></i>
                        </a>
                    </td>
                </tr>
            `;
        });
    }

    // 2. Tạo giao diện phân trang (Pagination)
    let paginationHtml = '';
    if (pages > 1) {
        paginationHtml += `
            <div class="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-white rounded-b-2xl">
                <div class="text-xs font-medium text-slate-500">Trang <span class="text-slate-800 font-bold">${currentPage}</span> / ${pages}</div>
                <div class="flex gap-2">
        `;
        if (currentPage > 1) {
            paginationHtml += `<a href="/?page=${currentPage - 1}" class="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">Trước</a>`;
        }
        if (currentPage < pages) {
            paginationHtml += `<a href="/?page=${currentPage + 1}" class="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm transition-colors">Kế tiếp</a>`;
        }
        paginationHtml += `</div></div>`;
    }

    // 3. Toàn bộ cấu trúc layout chia 2 vùng rõ ràng
    return `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                <div class="lg:col-span-1">
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
                        <div class="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
                            <div class="w-8 h-8 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl text-sm shadow-sm">
                                <i class="fas fa-plus-circle"></i>
                            </div>
                            <h2 class="text-base font-bold text-slate-900" id="form-title">Thêm công việc</h2>
                        </div>
                        
                        <form action="/jobs/create" method="POST" class="space-y-4" id="job-form">
                            <div>
                                <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Vị trí ứng tuyển <span class="text-rose-500">*</span></label>
                                <input type="text" name="title" required class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="Ví dụ: Node.js Developer">
                            </div>
                            
                            <div>
                                <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Công ty <span class="text-rose-500">*</span></label>
                                <input type="text" name="company" required class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="Ví dụ: FPT Software">
                            </div>
                            
                            <div>
                                <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Tên người ứng tuyển</label>
                                <input type="text" name="applicantName" class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="Họ và tên của bạn">
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Số điện thoại</label>
                                    <input type="tel" name="phone" class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="0905...">
                                </div>
                                <div>
                                    <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Địa chỉ</label>
                                    <input type="text" name="address" class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="Đà Nẵng...">
                                </div>
                            </div>
                            
                            <button type="submit" id="submit-btn" class="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-[0.98]">
                                <i class="fas fa-save mr-2 text-xs"></i>Lưu thông tin
                            </button>
                        </form>
                    </div>
                </div>

                <div class="lg:col-span-2">
                    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div class="p-5 border-b border-slate-100 bg-white">
                            <h3 class="font-bold text-slate-900 text-base">Tiến trình ứng tuyển</h3>
                        </div>
                        
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse table-auto">
                                <thead>
                                    <tr class="bg-slate-50/70 border-b border-slate-100">
                                        <th class="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">Vị trí</th>
                                        <th class="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">Công ty</th>
                                        <th class="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">Ứng viên</th>
                                        <th class="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">Liên hệ / Địa chỉ</th>
                                        <th class="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">Trạng thái</th>
                                        <th class="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-50">
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>
                        
                        ${paginationHtml}
                    </div>
                </div>

            </div>
        </div>

        <script>
            function fillFormToEdit(id, title, company, applicantName, phone, address) {
                // 1. Đổ dữ liệu cũ vào các ô Input
                document.querySelector('input[name="title"]').value = title;
                document.querySelector('input[name="company"]').value = company;
                document.querySelector('input[name="applicantName"]').value = applicantName;
                document.querySelector('input[name="phone"]').value = phone;
                document.querySelector('input[name="address"]').value = address;

                // 2. Đổi tiêu đề form và thuộc tính action hướng về endpoint cập nhật thông tin
                document.getElementById('form-title').innerText = 'Cập nhật công việc';
                document.getElementById('job-form').action = '/jobs/update-info/' + id;

                // 3. Thay đổi thiết kế giao diện nút bấm thành kiểu Cập nhật
                const submitBtn = document.getElementById('submit-btn');
                submitBtn.innerHTML = '<i class="fas fa-check-circle mr-2 text-xs"></i>Cập nhật thông tin';
                submitBtn.className = "w-full mt-2 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/10 transition-all active:scale-[0.98]";
            }
        </script>
    `;
};

module.exports = renderIndex;