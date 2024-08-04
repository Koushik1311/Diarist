export const sortEntries = (entries: DiaryEntry[]) => {
  const sortedEntries = entries
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return sortedEntries;
};
