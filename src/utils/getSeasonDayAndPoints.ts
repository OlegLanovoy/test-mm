// utils/getSeasonDayAndPoints.ts

export function getSeasonDayAndPoints(date = new Date()): {
  day: number;
  points: string | number;
} {
  const seasonStart = getSeasonStart(date);

  // Убираем часы, минуты, секунды
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const start = new Date(
    seasonStart.getFullYear(),
    seasonStart.getMonth(),
    seasonStart.getDate()
  );

  const msInDay = 1000 * 60 * 60 * 24;
  const diffDays =
    Math.floor((current.getTime() - start.getTime()) / msInDay) + 1;

  const day = Math.max(1, diffDays); // на всякий случай
  return {
    day,
    points: calculatePoints(day),
  };
}

function getSeasonStart(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0 — январь

  if (month >= 2 && month <= 4) return new Date(year, 2, 1); // Весна: 1 марта
  if (month >= 5 && month <= 7) return new Date(year, 5, 1); // Лето: 1 июня
  if (month >= 8 && month <= 10) return new Date(year, 8, 1); // Осень: 1 сентября

  return new Date(month === 11 ? year : year - 1, 11, 1); // Зима: 1 декабря
}

function calculatePoints(day: number): string | number {
  if (day === 1) return 2;
  if (day === 2) return 3;

  let points = [2, 3];
  for (let i = 3; i <= day; i++) {
    const val = Math.round(points[i - 2] + 0.6 * points[i - 3]);
    points.push(val);
  }

  const result = points[day - 1];
  return result > 1000 ? `${Math.round(result / 1000)}K` : result;
}
