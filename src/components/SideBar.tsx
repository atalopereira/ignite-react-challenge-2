import { useState, useEffect } from 'react';
import { Button } from './Button';

import { api } from '../services/api';

import { GenreResponseProps } from '../@types/GenreResponse'

interface SideBarProps {
  selectedGenreId: number
  onClickButton: (number: number) => void
}

export function SideBar({
  selectedGenreId,
  onClickButton
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}