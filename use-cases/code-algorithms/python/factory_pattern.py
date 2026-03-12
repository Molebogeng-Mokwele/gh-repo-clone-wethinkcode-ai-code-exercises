from abc import ABC, abstractmethod

class Notification(ABC):
    @abstractmethod
    def send(self, message): pass

class EmailNotification(Notification):
    def send(self, message): return f"Email sent: {message}"

class SMSNotification(Notification):
    def send(self, message): return f"SMS sent: {message}"

class NotificationFactory:
    @staticmethod
    def create_notification(method):
        methods = {"email": EmailNotification(), "sms": SMSNotification()}
        return methods.get(method.lower(), ValueError("Invalid method"))
