
/*
Why This Design Works
All dependencies are method parameters. TicketBookingService has zero fields. Every collaborator comes in through bookTicket() and disappears when the method returns. This is pure dependency with no structural coupling.

Each class has a single responsibility. SeatValidator validates seats. PaymentProcessor handles payments. QRCodeGenerator generates codes. EmailService sends emails. The booking service just coordinates the flow.

Testing is straightforward. You can pass mock implementations of any dependency without touching the booking service. Want to test what happens when payment fails? Pass a mock PaymentProcessor that returns false.

Swapping implementations is trivial. Need to switch from email to SMS notifications? Pass an SmsService instead of EmailService. The booking service doesn't care, it just calls the method on whatever it receives.
*/ 





class SeatValidator {
    isAvailable(eventId: string, seatNumber: string): boolean {
        console.log(`Checking seat ${seatNumber} for event ${eventId}`);
        return true; // Simulated: seat is available
    }
}

class PaymentProcessor {
    charge(email: string, amount: number): boolean {
        console.log(`Charging $${amount} to ${email}`);
        return true; // Simulated: payment succeeds
    }
}

class QRCodeGenerator {
    generate(eventId: string, seatNumber: string): string {
        const qrCode = `QR-${eventId}-${seatNumber}`;
        console.log(`Generated QR code: ${qrCode}`);
        return qrCode;
    }
}

class EmailService {
    sendConfirmation(email: string, qrCode: string): void {
        console.log(`Sending confirmation to ${email} with code ${qrCode}`);
    }
}

class TicketBookingService {
    bookTicket(eventId: string, seatNumber: string, email: string,
               amount: number, validator: SeatValidator,
               payment: PaymentProcessor, qrGenerator: QRCodeGenerator,
               emailService: EmailService): boolean {
        if (!validator.isAvailable(eventId, seatNumber)) {
            console.log("Seat not available.");
            return false;
        }

        if (!payment.charge(email, amount)) {
            console.log("Payment failed.");
            return false;
        }

        const qrCode = qrGenerator.generate(eventId, seatNumber);
        emailService.sendConfirmation(email, qrCode);

        console.log("Booking confirmed!");
        return true;
    }
}

const bookingService = new TicketBookingService();

// All dependencies are created externally and passed in
const validator = new SeatValidator();
const payment = new PaymentProcessor();
const qrGenerator = new QRCodeGenerator();
const emailService = new EmailService();

bookingService.bookTicket("CONF-2025", "A12", "alice@example.com",
    99.99, validator, payment, qrGenerator, emailService);