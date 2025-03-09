import { NotificationFactory } from './factory';

// Использование
const notifications = [
  NotificationFactory.create('email', 'Новое сообщение'),
  NotificationFactory.create('sms', 'СМС с кодом подтверждения'),
  NotificationFactory.create('push', 'Обновление статуса заказа'),
];

notifications.forEach((notification) => {
  console.log(notification.send());
});
