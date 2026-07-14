export interface ProjectEntry {
  id: string
  title: string
  to: string
}

export const PROJECT_LIST: ProjectEntry[] = [
  { id: 'chesslytics', title: 'ChessLytics', to: '/projects/chesslytics' },
  { id: 'chesslytics-dbt', title: 'ChessLytics dbt Pipeline', to: '/projects/chesslytics-dbt' },
  { id: 'whoop-debrief', title: 'WHOOP Debrief', to: '/projects/whoop-debrief' },
  { id: 'spotifriend', title: 'SpotiFriend', to: '/projects/spotifriend' },
  { id: 'nlp-pipeline', title: 'Reading Level Classifier', to: '/projects/nlp-pipeline' },
  { id: 'movie-recommendations', title: 'MovieLens Recommender', to: '/projects/movie-recommendations' },
  { id: 'etl-tools', title: 'Pison Technology ETL', to: '/projects/etl-tools' },
  { id: 'fidelity', title: 'Fidelity User Behavior Analysis', to: '/projects/fidelity' },
  { id: 'eeg-research', title: 'EEG Research Lab', to: '/projects/eeg-research' },
]
