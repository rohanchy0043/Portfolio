export type ContactValues = {
  name: string;
  email: string;
  reason: string;
  message: string;
};

export type ContactField = keyof ContactValues;
export type ContactErrors = Partial<Record<ContactField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const reason = values.reason.trim();
  const message = values.message.trim();

  if (name.length < 2 || name.length > 80) {
    errors.name = "Enter a name between 2 and 80 characters.";
  }

  if (!emailPattern.test(email) || email.length > 254) {
    errors.email = "Enter a valid email address.";
  }

  if (!reason) {
    errors.reason = "Choose a reason for getting in touch.";
  }

  if (message.length < 20 || message.length > 3000) {
    errors.message = "Write a message between 20 and 3,000 characters.";
  }

  return errors;
}
