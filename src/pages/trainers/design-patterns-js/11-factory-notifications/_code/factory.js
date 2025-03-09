// Базовый класс уведомлений
class Notification {
  constructor(text) {
    this.text = text;
  }

  send() {
    throw new Error('Метод send() должен быть реализован');
  }
}

// Конкретные типы уведомлений
class EmailNotification extends Notification {
  send() {
    return `Email: ${this.text}`;
  }
}

class SMSNotification extends Notification {
  send() {
    return `SMS: ${this.text}`;
  }
}

class PushNotification extends Notification {
  send() {
    return `Push: ${this.text}`;
  }
}

// Фабрика уведомлений
export class NotificationFactory {
  static create(type, text) {
    switch (type.toLowerCase()) {
      case 'email':
        return new EmailNotification(text);
      case 'sms':
        return new SMSNotification(text);
      case 'push':
        return new PushNotification(text);
      default:
        throw new Error('Неизвестный тип уведомления');
    }
  }
}
