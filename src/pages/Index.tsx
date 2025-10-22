import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  plays: number;
  rank: number;
  trend: 'up' | 'down' | 'same';
}

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const chartTracks: Track[] = [
    { id: 1, title: 'Broken Dreams', artist: 'The Void', album: 'Dark Echoes', plays: 45320, rank: 1, trend: 'up' },
    { id: 2, title: 'Electric Storm', artist: 'Dead Radio', album: 'Frequency', plays: 42150, rank: 2, trend: 'same' },
    { id: 3, title: 'Night Rider', artist: 'Black Highway', album: 'Midnight Run', plays: 38900, rank: 3, trend: 'up' },
    { id: 4, title: 'Rebel Soul', artist: 'Iron Rust', album: 'Underground', plays: 35670, rank: 4, trend: 'down' },
    { id: 5, title: 'Neon Lights', artist: 'The Anarchists', album: 'City Burn', plays: 32400, rank: 5, trend: 'up' },
    { id: 6, title: 'Shadow Walker', artist: 'Crimson Age', album: 'Lost Generation', plays: 29800, rank: 6, trend: 'same' },
    { id: 7, title: 'Rage Machine', artist: 'Steel Echo', album: 'Industrial', plays: 27500, rank: 7, trend: 'up' },
    { id: 8, title: 'Wild Heart', artist: 'Savage Youth', album: 'Revolution', plays: 25100, rank: 8, trend: 'down' },
  ];

  const featuredArtists = [
    { name: 'The Void', genre: 'Alternative Rock', tracks: 12 },
    { name: 'Dead Radio', genre: 'Indie Rock', tracks: 8 },
    { name: 'Black Highway', genre: 'Hard Rock', tracks: 15 },
    { name: 'Iron Rust', genre: 'Grunge', tracks: 10 },
  ];

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(220, 38, 38, 0.1) 2px,
            rgba(220, 38, 38, 0.1) 4px
          )`
        }}
      />

      <header className="relative border-b border-[#DC2626]/20 bg-[#18181B]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold tracking-wider text-white mb-1">
                THE SOUND OF ROCK
              </h1>
              <p className="text-[#DC2626] text-sm tracking-widest">UNDERGROUND MUSIC PLATFORM</p>
            </div>
            <nav className="flex gap-6 items-center">
              <a href="#chart" className="text-white hover:text-[#DC2626] transition-colors font-medium">ЧАРТ</a>
              <a href="#artists" className="text-white hover:text-[#DC2626] transition-colors font-medium">МУЗЫКАНТЫ</a>
              <a href="#albums" className="text-white hover:text-[#DC2626] transition-colors font-medium">АЛЬБОМЫ</a>
              <Button className="bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold">
                ЗАГРУЗИТЬ ТРЕК
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, #DC2626 0%, #18181B 50%, #000000 100%)'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#DC2626] text-white border-none text-lg px-6 py-2">
              🎸 LIVE NOW
            </Badge>
            <h2 className="text-7xl font-bold text-white mb-6 tracking-wide">
              МОЛОДЫЕ РОКЕРЫ<br />ЗАХВАТЫВАЮТ ЭФИР
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Слушай лучшие треки от независимых рок-групп. Голосуй за любимых артистов. 
              Поднимайся в чарте The Sound of Rock.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold text-lg px-8 py-6">
                <Icon name="Play" className="mr-2" size={24} />
                ИГРАТЬ ТОП-50
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-6">
                <Icon name="Upload" className="mr-2" size={24} />
                ЗАГРУЗИТЬ МУЗЫКУ
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="chart" className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-6xl font-bold text-white mb-2 tracking-wide">THE SOUND OF ROCK</h2>
            <p className="text-[#DC2626] text-xl">LIVE CHART — ОБНОВЛЯЕТСЯ КАЖДЫЙ ЧАС</p>
          </div>

          <div className="grid gap-4">
            {chartTracks.map((track) => (
              <Card 
                key={track.id}
                className="bg-[#18181B] border-[#52525B] hover:border-[#DC2626] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold text-[#DC2626] w-16 text-center">
                      {track.rank}
                    </div>
                    <div className="flex flex-col items-center">
                      {track.trend === 'up' && <Icon name="TrendingUp" size={20} className="text-green-500" />}
                      {track.trend === 'down' && <Icon name="TrendingDown" size={20} className="text-red-500" />}
                      {track.trend === 'same' && <Icon name="Minus" size={20} className="text-gray-500" />}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePlay(track)}
                    className="h-14 w-14 rounded-full bg-[#DC2626] hover:bg-[#DC2626]/80 text-white flex-shrink-0"
                  >
                    <Icon name={currentTrack?.id === track.id && isPlaying ? "Pause" : "Play"} size={24} />
                  </Button>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{track.title}</h3>
                    <p className="text-gray-400">{track.artist} • {track.album}</p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">ПРОСЛУШИВАНИЙ</div>
                      <div className="text-xl font-bold text-white">{track.plays.toLocaleString()}</div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#DC2626]">
                      <Icon name="Heart" size={24} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Icon name="MoreVertical" size={24} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="artists" className="relative py-16 bg-[#18181B]/50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-6xl font-bold text-white mb-2 tracking-wide">FEATURED ARTISTS</h2>
            <p className="text-[#DC2626] text-xl">ЛУЧШИЕ МОЛОДЫЕ РОКЕРЫ МЕСЯЦА</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {featuredArtists.map((artist, index) => (
              <Card 
                key={index}
                className="bg-[#0A0A0A] border-[#52525B] hover:border-[#DC2626] transition-all duration-300 group cursor-pointer overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-[#DC2626] to-[#18181B] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Disc3" size={80} className="text-white/20 group-hover:rotate-180 transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-[#DC2626] text-white border-none">
                      {artist.tracks} треков
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{artist.name}</h3>
                  <p className="text-gray-400">{artist.genre}</p>
                  <Button className="w-full mt-4 bg-transparent border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white font-bold">
                    СЛУШАТЬ
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#18181B] border-t border-[#DC2626]/20 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#DC2626] to-[#18181B] rounded flex items-center justify-center">
                  <Icon name="Music" size={28} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{currentTrack.title}</h4>
                  <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Button variant="ghost" size="icon" className="text-white">
                  <Icon name="SkipBack" size={24} />
                </Button>
                <Button
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-12 w-12 rounded-full bg-[#DC2626] hover:bg-[#DC2626]/80 text-white"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                  <Icon name="SkipForward" size={24} />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-white">
                  <Icon name="Volume2" size={24} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                  <Icon name="Heart" size={24} />
                </Button>
              </div>
            </div>

            <div className="mt-3">
              <div className="w-full bg-[#52525B] h-1 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#DC2626] rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? '45%' : '0%' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
