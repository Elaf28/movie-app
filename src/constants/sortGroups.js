export default [
  {
    name: 'Average Rating',
    options: [
      { label: 'Highest First', value: 'vote_average.desc' },
      { label: 'Lowest First', value: 'vote_average.asc' },
    ],
  },
  {
    name: 'Release Date',
    options: [
      { label: 'Newest First', value: 'primary_release_date.desc' },
      { label: 'Oldest First', value: 'primary_release_date.asc' },
    ],
  },
  {
    name: 'Popularity',
    options: [
      { label: 'Most Popular', value: 'popularity.desc' },
      { label: 'Least Popular', value: 'popularity.asc' },
    ],
  },
];
