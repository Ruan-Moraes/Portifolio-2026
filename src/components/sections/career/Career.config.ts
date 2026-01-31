export interface TimelineItem {
  year: string;
  titleKey: string;
  descriptionKey: string;
  isCurrent?: boolean;
  isFuture?: boolean;
}

export const timelineData: TimelineItem[] = [
  {
    year: '2014',
    titleKey: 'career.timeline.firstContact.title',
    descriptionKey: 'career.timeline.firstContact.description',
  },
  {
    year: '2018',
    titleKey: 'career.timeline.programming.title',
    descriptionKey: 'career.timeline.programming.description',
  },
  {
    year: '2022',
    titleKey: 'career.timeline.ownComputer.title',
    descriptionKey: 'career.timeline.ownComputer.description',
  },
  {
    year: '2024',
    titleKey: 'career.timeline.university.title',
    descriptionKey: 'career.timeline.university.description',
  },
  {
    year: '2025',
    titleKey: 'career.timeline.firstJob.title',
    descriptionKey: 'career.timeline.firstJob.description',
    isCurrent: true,
  },
  {
    year: '????',
    titleKey: 'career.timeline.future.title',
    descriptionKey: 'career.timeline.future.description',
    isFuture: true,
  },
];