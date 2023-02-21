export const useStudentsCounting = (students) => {
  let studentsCount = students.length; // общее количество

  let fullTime = 0; // очно
  let inAbsentia = 0; //заочно

  let budget = 0; // бюджет
  let commerce = 0; // коммерция

  let deducted = 0; // отчислен
  let accepted = 0; // принят
  let transferred = 0; // переведен

  let men = 0;
  let woman = 0;

  for (const item of students) {
    if (item.educationForm === "Очно") {
      fullTime++;
    }
    if (item.educationForm === "Заочно") {
      inAbsentia++;
    }
    if (item.educationType === "Бюджет") {
      budget++;
    }
    if (item.educationType === "Коммерция") {
      commerce++;
    }
    if (item.status === "Принят") {
      accepted++;
    }
    if (item.status === "Отчислен") {
      deducted++;
    }
    if (item.status === "Перевод") {
      transferred++;
    }
    if (item.gender === "Мужской") {
      men++;
    }
    if (item.gender === "Женский") {
      woman++;
    }
  }
  return [
    studentsCount,
    fullTime,
    inAbsentia,
    budget,
    commerce,
    accepted,
    deducted,
    transferred,
    men,
    woman,
  ];
};
