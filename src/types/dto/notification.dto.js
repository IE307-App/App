// notification.dto.js
class NotificationDto {
    constructor(message, type, isRead, userGui, userNhan) {
        this.message = message; // Nội dung thông báo
        this.type = type; // Loại thông báo (ví dụ: "info", "warning", "error")
        this.isRead = isRead || false; // Trạng thái đã đọc hay chưa
        this.userIdGui = userGui; // ID người gửi thông báo
        this.userIdNhan = userNhan; // ID người nhận thông báo
    }
}

export default NotificationDto;
