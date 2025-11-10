'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify, FaSoundcloud, FaApple, FaYoutube, FaPlay, FaPause } from 'react-icons/fa';

interface Track {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: 'Track One',
    description: 'Cinematic orchestral piece',
    audioUrl: '/music/track1.mp3',
  },
  {
    id: 2,
    title: 'Track Two',
    description: 'Epic trailer music',
    audioUrl: '/music/track2.mp3',
  },
  {
    id: 3,
    title: 'Track Three',
    description: 'Emotional underscore',
    audioUrl: '/music/track3.mp3',
  },
];

const externalLinks = [
  { name: 'Spotify', icon: FaSpotify, url: 'https://open.spotify.com' },
  { name: 'SoundCloud', icon: FaSoundcloud, url: 'https://soundcloud.com' },
  { name: 'Apple Music', icon: FaApple, url: 'https://music.apple.com' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com' },
];

export default function Music() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: Track) => {
    if (currentTrack?.id === track.id) {
      handlePlayPause();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <section id="music" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-gray-900">Music</h2>

          {/* Audio Player */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            {currentTrack ? (
              <>
                <audio ref={audioRef} src={currentTrack.audioUrl} />
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{currentTrack.title}</h3>
                  <p className="text-gray-600">{currentTrack.description}</p>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={handlePlayPause}
                    className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #171717 0%, #171717 ${(currentTime / (duration || 1)) * 100}%, #d1d5db ${(currentTime / (duration || 1)) * 100}%, #d1d5db 100%)`
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 min-w-[80px] text-right">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-600">Select a track to play</p>
            )}
          </div>

          {/* Playlist */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {tracks.map((track) => (
              <motion.button
                key={track.id}
                onClick={() => handleTrackSelect(track)}
                className={`p-5 rounded-lg text-left transition-all border ${
                  currentTrack?.id === track.id
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-200'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg">{track.title}</h4>
                  {currentTrack?.id === track.id && isPlaying && (
                    <FaPause className="text-sm" />
                  )}
                </div>
                <p className={`text-sm ${currentTrack?.id === track.id ? 'text-gray-300' : 'text-gray-600'}`}>
                  {track.description}
                </p>
              </motion.button>
            ))}
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Listen on</h3>
            <div className="flex flex-wrap gap-4">
              {externalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="text-xl" />
                    <span>{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

