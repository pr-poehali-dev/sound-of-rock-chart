import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import UploadDialog from '@/components/UploadDialog';
import ArtistProfile from '@/components/ArtistProfile';

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
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [newUploadedTracks, setNewUploadedTracks] = useState<Track[]>([]);
  const [showNewTrackBadge, setShowNewTrackBadge] = useState(false);

  const initialChartTracks: Track[] = [
    { id: 1, title: 'Broken Dreams', artist: 'The Void', album: 'Dark Echoes', plays: 45320, rank: 1, trend: 'up' },
    { id: 2, title: 'Electric Storm', artist: 'Dead Radio', album: 'Frequency', plays: 42150, rank: 2, trend: 'same' },
    { id: 3, title: 'Night Rider', artist: 'Black Highway', album: 'Midnight Run', plays: 38900, rank: 3, trend: 'up' },
    { id: 4, title: 'Rebel Soul', artist: 'Iron Rust', album: 'Underground', plays: 35670, rank: 4, trend: 'down' },
    { id: 5, title: 'Neon Lights', artist: 'The Anarchists', album: 'City Burn', plays: 32400, rank: 5, trend: 'up' },
    { id: 6, title: 'Shadow Walker', artist: 'Crimson Age', album: 'Lost Generation', plays: 29800, rank: 6, trend: 'same' },
    { id: 7, title: 'Rage Machine', artist: 'Steel Echo', album: 'Industrial', plays: 27500, rank: 7, trend: 'up' },
    { id: 8, title: 'Wild Heart', artist: 'Savage Youth', album: 'Revolution', plays: 25100, rank: 8, trend: 'down' },
  ];

  const [chartTracks, setChartTracks] = useState<Track[]>(initialChartTracks);

  const handleUploadComplete = (uploadData: any) => {
    setTimeout(() => {
      const newTrack: Track = {
        id: Date.now(),
        title: uploadData.type === 'single' ? uploadData.trackTitle : `${uploadData.albumName} (Album)`,
        artist: uploadData.artistName,
        album: uploadData.type === 'single' ? 'Single' : uploadData.albumName,
        plays: Math.floor(Math.random() * 1000) + 100,
        rank: chartTracks.length + 1,
        trend: 'up'
      };

      setNewUploadedTracks(prev => [...prev, newTrack]);
      setShowNewTrackBadge(true);

      setTimeout(() => {
        setChartTracks(prev => [...prev, newTrack]);
        
        setTimeout(() => {
          setShowNewTrackBadge(false);
        }, 5000);
      }, 1000);
    }, 120000);
  };

  const featuredArtists = [
    { name: 'The Void', genre: 'Alternative Rock', tracks: 12 },
    { name: 'Dead Radio', genre: 'Indie Rock', tracks: 8 },
    { name: 'Black Highway', genre: 'Hard Rock', tracks: 15 },
    { name: 'Iron Rust', genre: 'Grunge', tracks: 10 },
  ];

  const artistsData: Record<string, any> = {
    'The Void': {
      name: 'The Void',
      genre: 'Alternative Rock',
      bio: 'The Void — молодая альтернативная рок-группа из Москвы, основанная в 2022 году. Их мрачное звучание и глубокие тексты быстро завоевали сердца фанатов андерграундной сцены. Группа известна своими энергичными живыми выступлениями и экспериментальным подходом к классическому року.',
      totalPlays: 250000,
      followers: 8500,
      photoGradient: '#DC2626, #7f1d1d',
      tracks: [
        { id: 1, title: 'Broken Dreams', album: 'Dark Echoes', plays: 45320, duration: '4:12' },
        { id: 2, title: 'Empty Streets', album: 'Dark Echoes', plays: 38900, duration: '3:45' },
        { id: 3, title: 'Lost in Time', album: 'Dark Echoes', plays: 32100, duration: '5:20' },
        { id: 4, title: 'Fade Away', album: 'Shadows', plays: 28400, duration: '4:03' },
        { id: 5, title: 'Silent Scream', album: 'Shadows', plays: 25600, duration: '3:58' },
      ],
      albums: [
        { id: 1, title: 'Dark Echoes', year: 2024, tracks: 10, plays: 156000, coverGradient: '#DC2626, #18181B' },
        { id: 2, title: 'Shadows', year: 2023, tracks: 8, plays: 94000, coverGradient: '#7f1d1d, #000000' },
      ]
    },
    'Dead Radio': {
      name: 'Dead Radio',
      genre: 'Indie Rock',
      bio: 'Dead Radio — инди-рок коллектив с уникальным звучанием, сочетающим классические рок-мотивы с современной электроникой. Созданная группой друзей в гараже, группа быстро выросла в одну из самых обсуждаемых на российской рок-сцене.',
      totalPlays: 180000,
      followers: 6200,
      photoGradient: '#DC2626, #991b1b',
      tracks: [
        { id: 6, title: 'Electric Storm', album: 'Frequency', plays: 42150, duration: '3:32' },
        { id: 7, title: 'Radio Waves', album: 'Frequency', plays: 35400, duration: '4:18' },
        { id: 8, title: 'Static Noise', album: 'Frequency', plays: 29800, duration: '3:50' },
        { id: 9, title: 'Dead Signal', album: 'Transmission', plays: 26100, duration: '4:45' },
      ],
      albums: [
        { id: 3, title: 'Frequency', year: 2024, tracks: 9, plays: 107000, coverGradient: '#DC2626, #450a0a' },
        { id: 4, title: 'Transmission', year: 2023, tracks: 7, plays: 73000, coverGradient: '#991b1b, #18181B' },
      ]
    },
    'Black Highway': {
      name: 'Black Highway',
      genre: 'Hard Rock',
      bio: 'Black Highway — тяжелая рок-группа, известная своими мощными гитарными риффами и драйвовыми композициями. С момента основания в 2021 году они выпустили два полноформатных альбома и собрали верную армию фанатов по всей стране.',
      totalPlays: 320000,
      followers: 12000,
      photoGradient: '#DC2626, #000000',
      tracks: [
        { id: 10, title: 'Night Rider', album: 'Midnight Run', plays: 38900, duration: '4:28' },
        { id: 11, title: 'Road to Hell', album: 'Midnight Run', plays: 42300, duration: '5:15' },
        { id: 12, title: 'Thunder Road', album: 'Midnight Run', plays: 36700, duration: '4:02' },
        { id: 13, title: 'Highway Dreams', album: 'Speed Demon', plays: 39200, duration: '3:55' },
      ],
      albums: [
        { id: 5, title: 'Midnight Run', year: 2024, tracks: 11, plays: 185000, coverGradient: '#DC2626, #0A0A0A' },
        { id: 6, title: 'Speed Demon', year: 2022, tracks: 10, plays: 135000, coverGradient: '#7f1d1d, #18181B' },
      ]
    },
    'Iron Rust': {
      name: 'Iron Rust',
      genre: 'Grunge',
      bio: 'Iron Rust — гранжевая группа с сырым звучанием 90-х. Их музыка пропитана духом бунтарства и искренности. Тексты о жизни, боли и надежде находят отклик у молодого поколения, ищущего настоящий рок без прикрас.',
      totalPlays: 210000,
      followers: 7800,
      photoGradient: '#b91c1c, #18181B',
      tracks: [
        { id: 14, title: 'Rebel Soul', album: 'Underground', plays: 35670, duration: '4:08' },
        { id: 15, title: 'Rust and Bones', album: 'Underground', plays: 31200, duration: '3:42' },
        { id: 16, title: 'Broken Chain', album: 'Underground', plays: 28900, duration: '4:35' },
        { id: 17, title: 'Iron Will', album: 'Raw Power', plays: 33400, duration: '3:28' },
      ],
      albums: [
        { id: 7, title: 'Underground', year: 2024, tracks: 9, plays: 125000, coverGradient: '#b91c1c, #000000' },
        { id: 8, title: 'Raw Power', year: 2023, tracks: 8, plays: 85000, coverGradient: '#7f1d1d, #0A0A0A' },
      ]
    },
  };

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
              <Button 
                onClick={() => setUploadDialogOpen(true)}
                className="bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold"
              >
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
              <Button 
                onClick={() => setUploadDialogOpen(true)}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-6"
              >
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
            {chartTracks.map((track) => {
              const isNewTrack = newUploadedTracks.some(t => t.id === track.id);
              return (
              <Card 
                key={track.id}
                className={`bg-[#18181B] border-[#52525B] hover:border-[#DC2626] transition-all duration-300 group relative overflow-hidden ${
                  isNewTrack ? 'animate-fade-in border-[#DC2626] shadow-lg shadow-[#DC2626]/20' : ''
                }`}
              >
                {isNewTrack && showNewTrackBadge && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-green-600 text-white border-none animate-pulse">
                      <Icon name="Sparkles" size={14} className="mr-1" />
                      НОВЫЙ ТРЕК
                    </Badge>
                  </div>
                )}
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
              );
            })}
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
                  <Button 
                    onClick={() => setSelectedArtist(artist.name)}
                    className="w-full mt-4 bg-transparent border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white font-bold"
                  >
                    ОТКРЫТЬ ПРОФИЛЬ
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

      <UploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen}
        onUploadComplete={handleUploadComplete}
      />
      
      {selectedArtist && artistsData[selectedArtist] && (
        <ArtistProfile
          artist={artistsData[selectedArtist]}
          tracks={artistsData[selectedArtist].tracks}
          albums={artistsData[selectedArtist].albums}
          onClose={() => setSelectedArtist(null)}
          onPlayTrack={(track) => {
            setCurrentTrack({
              id: track.id,
              title: track.title,
              artist: selectedArtist,
              album: track.album,
              plays: track.plays,
              rank: 0,
              trend: 'same'
            });
            setIsPlaying(true);
          }}
        />
      )}
    </div>
  );
};

export default Index;