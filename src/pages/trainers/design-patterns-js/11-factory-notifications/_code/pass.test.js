import { NotificationFactory } from './factory';

describe('NotificationFactory', () => {
  const testMessage = 'Тестовое уведомление';

  it('Создается EmailNotification с корректными параметрами,', () => {
    const notification = NotificationFactory.create('email', testMessage);
    expect(notification.send()).toBe(`Email: ${testMessage}`);
  });

  it('создается SMSNotification с корректными параметрами,', () => {
    const notification = NotificationFactory.create('sms', testMessage);
    expect(notification.send()).toBe(`SMS: ${testMessage}`);
  });

  it('создается PushNotification с корректными параметрами,', () => {
    const notification = NotificationFactory.create('push', testMessage);
    expect(notification.send()).toBe(`Push: ${testMessage}`);
  });

  it('выбрасывается ошибка при неизвестном типе', () => {
    expect(() => NotificationFactory.create('telegram', testMessage)).toThrow(
      'Неизвестный тип уведомления',
    );
  });
});
