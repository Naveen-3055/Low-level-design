class MessageFormatter {
    static format(category: string, userId: string, detail: string): string {
        const message = `[${category}] Hi ${userId}, ${detail}`;
        return message.charAt(0).toUpperCase() + message.slice(1);
    }
}

class NotificationSender {
    static send(userId: string, message: string): void {
        console.log("Connecting to notification API...");
        console.log(`Sending to ${userId}: ${message}`);
        console.log("Notification sent successfully.");
    }
}

class OrderService {
    notifyOrderConfirmation(userId: string, orderId: string): void {
        const message = MessageFormatter.format(
            "Order", userId, `your order ${orderId} has been confirmed.`);
        NotificationSender.send(userId, message);
    }
}

class ShippingService {
    notifyShipmentUpdate(userId: string, trackingId: string): void {
        const message = MessageFormatter.format(
            "Shipping", userId, `your shipment ${trackingId} is on its way.`);
        NotificationSender.send(userId, message);
    }
}

class SupportService {
    notifyTicketResolution(userId: string, ticketId: string): void {
        const message = MessageFormatter.format(
            "Support", userId, `your ticket ${ticketId} has been resolved.`);
        NotificationSender.send(userId, message);
    }
}

export { OrderService, ShippingService, SupportService };