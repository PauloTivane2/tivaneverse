export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type ContactStatus = "idle" | "sending" | "success" | "error"
