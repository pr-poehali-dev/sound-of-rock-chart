import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type UploadType = 'single' | 'album' | null;
type Step = 'type' | 'files' | 'info' | 'photo' | 'video' | 'credits' | 'success';

interface TrackFile {
  file: File;
  name: string;
}

const UploadDialog = ({ open, onOpenChange }: UploadDialogProps) => {
  const [uploadType, setUploadType] = useState<UploadType>(null);
  const [step, setStep] = useState<Step>('type');
  const [tracks, setTracks] = useState<TrackFile[]>([]);
  
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [trackTitle, setTrackTitle] = useState('');
  const [artistPhoto, setArtistPhoto] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [musicAuthor, setMusicAuthor] = useState('');
  const [lyricsAuthor, setLyricsAuthor] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const resetDialog = () => {
    setUploadType(null);
    setStep('type');
    setTracks([]);
    setArtistName('');
    setAlbumName('');
    setTrackTitle('');
    setArtistPhoto(null);
    setVideoUrl('');
    setMusicAuthor('');
    setLyricsAuthor('');
    setReleaseDate('');
  };

  const handleClose = () => {
    resetDialog();
    onOpenChange(false);
  };

  const handleTypeSelect = (type: UploadType) => {
    setUploadType(type);
    setStep('files');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxFiles = uploadType === 'single' ? 1 : 25;
    
    if (files.length > maxFiles) {
      alert(`Максимум ${maxFiles} ${uploadType === 'single' ? 'трек' : 'треков'}`);
      return;
    }

    const trackFiles = files.map(file => ({
      file,
      name: file.name
    }));
    
    setTracks(trackFiles);
  };

  const handleNext = () => {
    if (step === 'type') setStep('files');
    else if (step === 'files') setStep('info');
    else if (step === 'info') setStep('photo');
    else if (step === 'photo') setStep('video');
    else if (step === 'video') setStep('credits');
    else if (step === 'credits') setStep('success');
  };

  const handleBack = () => {
    if (step === 'files') setStep('type');
    else if (step === 'info') setStep('files');
    else if (step === 'photo') setStep('info');
    else if (step === 'video') setStep('photo');
    else if (step === 'credits') setStep('video');
  };

  const canProceedFromFiles = tracks.length > 0;
  const canProceedFromInfo = uploadType === 'single' 
    ? artistName && trackTitle 
    : artistName && albumName;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#18181B] border-[#DC2626] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-[#DC2626]">
            {step === 'type' && 'ЗАГРУЗИТЬ МУЗЫКУ'}
            {step === 'files' && (uploadType === 'single' ? 'ВЫБЕРИТЕ ТРЕК' : 'ВЫБЕРИТЕ ТРЕКИ ДЛЯ АЛЬБОМА')}
            {step === 'info' && 'ИНФОРМАЦИЯ О РЕЛИЗЕ'}
            {step === 'photo' && 'ФОТО АРТИСТА'}
            {step === 'video' && 'ВИДЕО'}
            {step === 'credits' && 'АВТОРЫ И ДАТА'}
            {step === 'success' && 'ГОТОВО!'}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {step === 'type' && (
            <div className="grid grid-cols-2 gap-6">
              <Card 
                onClick={() => handleTypeSelect('single')}
                className="bg-[#0A0A0A] border-[#52525B] hover:border-[#DC2626] transition-all cursor-pointer p-8 text-center group"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#DC2626] to-[#18181B] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Music" size={48} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">ОДИН ТРЕК</h3>
                <p className="text-gray-400">Загрузите одиночную композицию</p>
              </Card>

              <Card 
                onClick={() => handleTypeSelect('album')}
                className="bg-[#0A0A0A] border-[#52525B] hover:border-[#DC2626] transition-all cursor-pointer p-8 text-center group"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#DC2626] to-[#18181B] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Disc3" size={48} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">АЛЬБОМ</h3>
                <p className="text-gray-400">От 1 до 25 треков</p>
              </Card>
            </div>
          )}

          {step === 'files' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-[#52525B] hover:border-[#DC2626] rounded-lg p-12 text-center transition-colors">
                <Icon name="Upload" size={64} className="text-[#DC2626] mx-auto mb-4" />
                <p className="text-xl text-white mb-2">
                  {uploadType === 'single' ? 'Выберите аудиофайл' : 'Выберите от 1 до 25 треков'}
                </p>
                <p className="text-gray-400 mb-6">MP3, WAV, FLAC до 50MB</p>
                <input
                  type="file"
                  accept="audio/*"
                  multiple={uploadType === 'album'}
                  onChange={handleFileSelect}
                  className="hidden"
                  id="audio-upload"
                />
                <label htmlFor="audio-upload">
                  <Button asChild className="bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold">
                    <span>ВЫБРАТЬ ФАЙЛЫ</span>
                  </Button>
                </label>
              </div>

              {tracks.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-white">Выбранные файлы ({tracks.length}):</h4>
                  {tracks.map((track, index) => (
                    <div key={index} className="flex items-center gap-3 bg-[#0A0A0A] p-4 rounded border border-[#52525B]">
                      <Icon name="Music" size={20} className="text-[#DC2626]" />
                      <span className="text-white flex-1">{track.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTracks(tracks.filter((_, i) => i !== index))}
                        className="text-gray-400 hover:text-[#DC2626]"
                      >
                        <Icon name="X" size={20} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 border-[#52525B] text-white hover:bg-[#52525B]">
                  НАЗАД
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!canProceedFromFiles}
                  className="flex-1 bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold disabled:opacity-50"
                >
                  ДАЛЕЕ
                </Button>
              </div>
            </div>
          )}

          {step === 'info' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="artist" className="text-white text-lg mb-2 block">
                    Название группы / имя музыканта *
                  </Label>
                  <Input
                    id="artist"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Введите название"
                    className="bg-[#0A0A0A] border-[#52525B] text-white text-lg p-6"
                  />
                </div>

                {uploadType === 'album' ? (
                  <div>
                    <Label htmlFor="album" className="text-white text-lg mb-2 block">
                      Название альбома *
                    </Label>
                    <Input
                      id="album"
                      value={albumName}
                      onChange={(e) => setAlbumName(e.target.value)}
                      placeholder="Введите название альбома"
                      className="bg-[#0A0A0A] border-[#52525B] text-white text-lg p-6"
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="track" className="text-white text-lg mb-2 block">
                      Название трека *
                    </Label>
                    <Input
                      id="track"
                      value={trackTitle}
                      onChange={(e) => setTrackTitle(e.target.value)}
                      placeholder="Введите название трека"
                      className="bg-[#0A0A0A] border-[#52525B] text-white text-lg p-6"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 border-[#52525B] text-white hover:bg-[#52525B]">
                  НАЗАД
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!canProceedFromInfo}
                  className="flex-1 bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold disabled:opacity-50"
                >
                  ДАЛЕЕ
                </Button>
              </div>
            </div>
          )}

          {step === 'photo' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-[#52525B] hover:border-[#DC2626] rounded-lg p-12 text-center transition-colors">
                {artistPhoto ? (
                  <div className="space-y-4">
                    <Icon name="CheckCircle" size={64} className="text-green-500 mx-auto" />
                    <p className="text-white text-lg">Фото загружено: {artistPhoto.name}</p>
                    <Button
                      onClick={() => setArtistPhoto(null)}
                      variant="outline"
                      className="border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
                    >
                      ВЫБРАТЬ ДРУГОЕ
                    </Button>
                  </div>
                ) : (
                  <>
                    <Icon name="Image" size={64} className="text-[#DC2626] mx-auto mb-4" />
                    <p className="text-xl text-white mb-2">Загрузите фото артиста или группы</p>
                    <p className="text-gray-400 mb-6">JPG, PNG до 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files && setArtistPhoto(e.target.files[0])}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload">
                      <Button asChild className="bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold">
                        <span>ВЫБРАТЬ ФОТО</span>
                      </Button>
                    </label>
                  </>
                )}
              </div>

              <p className="text-gray-400 text-sm text-center">* Этот шаг можно пропустить</p>

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 border-[#52525B] text-white hover:bg-[#52525B]">
                  НАЗАД
                </Button>
                <Button 
                  onClick={handleNext}
                  className="flex-1 bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold"
                >
                  ДАЛЕЕ
                </Button>
              </div>
            </div>
          )}

          {step === 'video' && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="video" className="text-white text-lg mb-2 block">
                  Ссылка на видео (необязательно)
                </Label>
                <Textarea
                  id="video"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Вставьте ссылку на YouTube, Vimeo и т.д."
                  className="bg-[#0A0A0A] border-[#52525B] text-white text-lg p-4 min-h-[120px]"
                />
                <p className="text-gray-400 text-sm mt-2">
                  Поделитесь видео с выступлением, концертом или клипом
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 border-[#52525B] text-white hover:bg-[#52525B]">
                  НАЗАД
                </Button>
                <Button 
                  onClick={handleNext}
                  className="flex-1 bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold"
                >
                  ДАЛЕЕ
                </Button>
              </div>
            </div>
          )}

          {step === 'credits' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="music-author" className="text-white text-lg mb-2 block">
                    Автор музыки
                  </Label>
                  <Input
                    id="music-author"
                    value={musicAuthor}
                    onChange={(e) => setMusicAuthor(e.target.value)}
                    placeholder="Имя композитора"
                    className="bg-[#0A0A0A] border-[#52525B] text-white text-lg p-6"
                  />
                </div>

                <div>
                  <Label htmlFor="lyrics-author" className="text-white text-lg mb-2 block">
                    Автор текста
                  </Label>
                  <Input
                    id="lyrics-author"
                    value={lyricsAuthor}
                    onChange={(e) => setLyricsAuthor(e.target.value)}
                    placeholder="Имя автора текста"
                    className="bg-[#0A0A0A] border-[#52525B] text-white text-lg p-6"
                  />
                </div>

                <div>
                  <Label htmlFor="release-date" className="text-white text-lg mb-2 block">
                    Дата релиза (если был)
                  </Label>
                  <Input
                    id="release-date"
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="bg-[#0A0A0A] border-[#52525B] text-white text-lg p-6"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 border-[#52525B] text-white hover:bg-[#52525B]">
                  НАЗАД
                </Button>
                <Button 
                  onClick={handleNext}
                  className="flex-1 bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold"
                >
                  ЗАВЕРШИТЬ
                </Button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6 py-8">
              <Icon name="CheckCircle" size={96} className="text-green-500 mx-auto" />
              <h3 className="text-3xl font-bold text-white">
                {uploadType === 'single' ? 'ТРЕК ЗАГРУЖЕН!' : 'АЛЬБОМ ЗАГРУЖЕН!'}
              </h3>
              <p className="text-gray-300 text-lg">
                {artistName} - {uploadType === 'single' ? trackTitle : albumName}
              </p>
              <p className="text-gray-400">
                Ваша музыка отправлена на модерацию и скоро появится в чарте!
              </p>
              <Button 
                onClick={handleClose}
                className="bg-[#DC2626] hover:bg-[#DC2626]/80 text-white font-bold text-lg px-12 py-6"
              >
                ЗАКРЫТЬ
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
