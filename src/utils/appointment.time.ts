export function calculateEndTime(
  startTime: string,
  durationMinutes: number
): string {

  const [hours, minutes] =
    startTime.split(":").map(Number);

  const totalMinutes =
    (hours * 60) + minutes + durationMinutes;

  const endHour =
    Math.floor(totalMinutes / 60);

  const endMinute =
    totalMinutes % 60;

  return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}:00`;

}