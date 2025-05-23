"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LanguageSelector({ value, onChange, includeEmpty = false }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {includeEmpty && <SelectItem value="all">All languages</SelectItem>}
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ar">Arabic</SelectItem>
        <SelectItem value="de">German</SelectItem>
        <SelectItem value="es">Spanish</SelectItem>
        <SelectItem value="fr">French</SelectItem>
        <SelectItem value="he">Hebrew</SelectItem>
        <SelectItem value="it">Italian</SelectItem>
        <SelectItem value="nl">Dutch</SelectItem>
        <SelectItem value="no">Norwegian</SelectItem>
        <SelectItem value="pt">Portuguese</SelectItem>
        <SelectItem value="ru">Russian</SelectItem>
        <SelectItem value="sv">Swedish</SelectItem>
        <SelectItem value="zh">Chinese</SelectItem>
      </SelectContent>
    </Select>
  )
}
