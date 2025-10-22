import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Track {
  id: number;
  title: string;
  album: string;
  plays: number;
  duration: string;
}

interface Album {
  id: number;
  title: string;
  year: number;
  tracks: number;
  plays: number;
  coverGradient: string;
}

interface ArtistProfileProps {
  artist: {
    name: string;
    genre: string;
    bio: string;
    totalPlays: number;
    followers: number;
    photoGradient: string;
  };
  tracks: Track[];
  albums: Album[];
  onClose: () => void;
  onPlayTrack: (track: Track) => void;
}

const ArtistProfile = ({ artist, tracks, albums, onClose, onPlayTrack }: ArtistProfileProps) => {
  return (
    <div className="fixed inset-0 bg-[#0A0A0A] z-50 overflow-y-auto">
      <div className="min-h-screen">
        <div 
          className="relative h-[400px] overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${artist.photoGradient} 0%, #0A0A0A 100%)`
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="container mx-auto px-4 h-full relative z-10">
            <div className="pt-8">
              <Button
                onClick={onClose}
                variant="ghost"
                className="text-white hover:text-[#DC2626]"
              >
                <Icon name="ArrowLeft" size={24} className="mr-2" />
                НАЗАД К ЧАРТУ
              </Button>
            </div>

            <div className="absolute bottom-8 left-0 right-0">
              <div className="container mx-auto px-4">
                <div className="flex items-end gap-8">
                  <div 
                    className="w-48 h-48 rounded-lg flex items-center justify-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${artist.photoGradient})`
                    }}
                  >
                    <Icon name="User" size={96} className="text-white/80" />
                  </div>

                  <div className="flex-1 pb-4">
                    <Badge className="mb-4 bg-[#DC2626] text-white border-none text-sm">
                      АРТИСТ
                    </Badge>
                    <h1 className="text-7xl font-bold text-white mb-4 tracking-wide">
                      {artist.name}
                    </h1>
                    <div className="flex items-center gap-6 text-white">
                      <span className="text-lg">{artist.genre}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-lg">{artist.followers.toLocaleString()} подписчиков</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-lg">{artist.totalPlays.toLocaleString()} прослушиваний</span>
                    </div>
                  </div>

                  <div className="pb-4 flex gap-4">
                    <Button className="bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold text-lg px-8 py-6">
                      <Icon name="Play" className="mr-2" size={24} />
                      ИГРАТЬ
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-6">
                      <Icon name="UserPlus" className="mr-2" size={24} />
                      ПОДПИСАТЬСЯ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="bg-[#18181B] border-b border-[#52525B] w-full justify-start rounded-none h-auto p-0">
              <TabsTrigger 
                value="tracks" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-[#DC2626] data-[state=active]:border-b-2 data-[state=active]:border-[#DC2626] rounded-none px-8 py-4 text-lg font-bold"
              >
                ТРЕКИ
              </TabsTrigger>
              <TabsTrigger 
                value="albums" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-[#DC2626] data-[state=active]:border-b-2 data-[state=active]:border-[#DC2626] rounded-none px-8 py-4 text-lg font-bold"
              >
                АЛЬБОМЫ
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-[#DC2626] data-[state=active]:border-b-2 data-[state=active]:border-[#DC2626] rounded-none px-8 py-4 text-lg font-bold"
              >
                О ГРУППЕ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tracks" className="mt-8">
              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <Card 
                    key={track.id}
                    className="bg-[#18181B] border-[#52525B] hover:border-[#DC2626] transition-all group"
                  >
                    <div className="p-4 flex items-center gap-6">
                      <span className="text-gray-400 w-8 text-center font-bold">
                        {index + 1}
                      </span>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onPlayTrack(track)}
                        className="h-12 w-12 rounded-full bg-[#DC2626]/10 hover:bg-[#DC2626] text-[#DC2626] hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Icon name="Play" size={20} />
                      </Button>

                      <div className="flex-1">
                        <h4 className="text-white font-bold text-lg">{track.title}</h4>
                        <p className="text-gray-400 text-sm">{track.album}</p>
                      </div>

                      <div className="text-gray-400 text-sm">
                        {track.plays.toLocaleString()} прослушиваний
                      </div>

                      <div className="text-gray-400 text-sm w-16 text-right">
                        {track.duration}
                      </div>

                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#DC2626]">
                        <Icon name="Heart" size={20} />
                      </Button>

                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Icon name="MoreVertical" size={20} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="albums" className="mt-8">
              <div className="grid grid-cols-4 gap-6">
                {albums.map((album) => (
                  <Card 
                    key={album.id}
                    className="bg-[#18181B] border-[#52525B] hover:border-[#DC2626] transition-all group cursor-pointer"
                  >
                    <div 
                      className="aspect-square relative overflow-hidden rounded-t-lg"
                      style={{
                        background: `linear-gradient(135deg, ${album.coverGradient})`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Disc3" size={80} className="text-white/20 group-hover:rotate-180 transition-transform duration-700" />
                      </div>
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                      
                      <Button
                        className="absolute bottom-4 right-4 h-14 w-14 rounded-full bg-[#DC2626] hover:bg-[#DC2626]/80 text-white opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                      >
                        <Icon name="Play" size={24} />
                      </Button>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{album.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {album.year} • {album.tracks} треков
                      </p>
                      <p className="text-gray-500 text-sm">
                        {album.plays.toLocaleString()} прослушиваний
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-8">
              <Card className="bg-[#18181B] border-[#52525B] p-8">
                <h3 className="text-3xl font-bold text-white mb-6">О ГРУППЕ</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {artist.bio}
                </p>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-[#0A0A0A] rounded-lg">
                    <Icon name="Users" size={40} className="text-[#DC2626] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {artist.followers.toLocaleString()}
                    </div>
                    <div className="text-gray-400">Подписчиков</div>
                  </div>

                  <div className="text-center p-6 bg-[#0A0A0A] rounded-lg">
                    <Icon name="Play" size={40} className="text-[#DC2626] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {artist.totalPlays.toLocaleString()}
                    </div>
                    <div className="text-gray-400">Прослушиваний</div>
                  </div>

                  <div className="text-center p-6 bg-[#0A0A0A] rounded-lg">
                    <Icon name="Disc3" size={40} className="text-[#DC2626] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {albums.length}
                    </div>
                    <div className="text-gray-400">Альбомов</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-white">
                    <Icon name="Music" size={24} className="text-[#DC2626]" />
                    <span className="font-bold">Жанр:</span>
                    <span className="text-gray-400">{artist.genre}</span>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <Icon name="MapPin" size={24} className="text-[#DC2626]" />
                    <span className="font-bold">Город:</span>
                    <span className="text-gray-400">Москва, Россия</span>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <Icon name="Calendar" size={24} className="text-[#DC2626]" />
                    <span className="font-bold">На платформе:</span>
                    <span className="text-gray-400">С 2024 года</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
