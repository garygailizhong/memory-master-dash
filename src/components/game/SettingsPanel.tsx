import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { GameSettings, Difficulty, DIFFICULTY_CONFIG } from '@/types/game';
import { cn } from '@/lib/utils';

interface SettingsPanelProps {
  settings: GameSettings;
  onUpdateSettings: (partial: Partial<GameSettings>) => void;
  onClose: () => void;
}

export const SettingsPanel = ({ settings, onUpdateSettings, onClose }: SettingsPanelProps) => {
  const difficulties: Difficulty[] = ['easy', 'normal', 'hard'];

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">⚙️ 设置</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
          ✕
        </Button>
      </div>

      {/* 难度设置 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-muted-foreground">难度选择</h3>
        <div className="flex gap-2">
          {difficulties.map(diff => (
            <Button
              key={diff}
              variant={settings.difficulty === diff ? 'default' : 'outline'}
              onClick={() => onUpdateSettings({ difficulty: diff })}
              className={cn(
                'flex-1 py-6 rounded-xl',
                settings.difficulty === diff && 'ring-2 ring-primary ring-offset-2'
              )}
            >
              <div className="text-center">
                <div className="text-lg font-bold">{DIFFICULTY_CONFIG[diff].label}</div>
                <div className="text-xs opacity-70">
                  {DIFFICULTY_CONFIG[diff].displayTime / 1000}秒
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* 音效开关 */}
      <div className="flex items-center justify-between bg-card rounded-xl p-4">
        <div>
          <h3 className="font-semibold">🔊 音效</h3>
          <p className="text-sm text-muted-foreground">开启游戏音效</p>
        </div>
        <Switch
          checked={settings.soundEnabled}
          onCheckedChange={(checked) => onUpdateSettings({ soundEnabled: checked })}
        />
      </div>

      <Button onClick={onClose} size="lg" className="w-full rounded-xl py-6 mt-4">
        保存设置
      </Button>
    </div>
  );
};
