import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  SquareArrowOutUpRight,
  LayoutGrid,
  Copy,
  Loader2,
  MoveHorizontal,
  PanelLeft,
  PanelRight,
} from "lucide-react";
import {
  useEditorStore,
  type ShadowType,
  type AspectRatioType,
  type DockPosition,
} from "@/hooks/use-editor-store";
import { GradientPicker } from "./GradientPicker";
import { ControlSlider } from "./ControlSlider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FloatingDockProps {
  onExport: () => Promise<void>;
  isExporting: boolean;
}

const shadowOptions: { label: string; value: ShadowType }[] = [
  { label: "None", value: "none" },
  { label: "Soft", value: "soft" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const aspectRatios: { label: string; value: AspectRatioType }[] = [
  { label: "16:9", value: "16/9" },
  { label: "1:1", value: "1/1" },
  { label: "4:3", value: "4/3" },
];

const dockPositions: { icon: typeof PanelLeft; value: DockPosition }[] = [
  { icon: PanelRight, value: "left" },
  { icon: PanelLeft, value: "right" },
];

export function FloatingDock({ onExport, isExporting }: FloatingDockProps) {
  const {
    padding,
    borderRadius,
    imageRadius,
    shadow,
    aspectRatio,
    width,
    dockPosition,
    setPadding,
    setBorderRadius,
    setImageRadius,
    setShadow,
    setAspectRatio,
    setWidth,
    setDockPosition,
  } = useEditorStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-72 h-screen flex flex-col bg-neutral-900/95 backdrop-blur-2xl border-r border-neutral-700 shadow-2xl"
    >
      <div className="flex-1 flex flex-col p-5 space-y-4">
        {/* Position Toggle */}
        <div className="flex gap-2 justify-center">
          {dockPositions.map(({ icon: Icon, value }) => (
            <button
              key={value}
              onClick={() => setDockPosition(value)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                dockPosition === value
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
              title={`Dock ${value}`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <Separator className="bg-neutral-700" />

        {/* Background Picker */}
        <GradientPicker />

        <Separator className="bg-neutral-700" />

        {/* Width Slider */}
        <ControlSlider
          icon={MoveHorizontal}
          label="Width"
          value={width}
          onChange={setWidth}
          min={400}
          max={1200}
          step={10}
        />

        {/* Padding Slider */}
        <ControlSlider
          icon={SlidersHorizontal}
          label="Padding"
          value={padding}
          onChange={setPadding}
          min={0}
          max={128}
        />

        {/* Canvas Radius Slider */}
        <ControlSlider
          icon={SquareArrowOutUpRight}
          label="Canvas Radius"
          value={borderRadius}
          onChange={setBorderRadius}
          min={0}
          max={48}
        />

        {/* Image Radius Slider */}
        <ControlSlider
          icon={SquareArrowOutUpRight}
          label="Image Radius"
          value={imageRadius}
          onChange={setImageRadius}
          min={0}
          max={48}
        />

        <Separator className="bg-neutral-700" />

        {/* Image Shadow - Compact Grid */}
        <div>
          <p className="text-sm font-medium text-neutral-200 mb-2">Shadow</p>
          <div className="grid grid-cols-2 gap-1.5">
            {shadowOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setShadow(option.value)}
                className={`
                  px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-200
                  ${
                    shadow === option.value
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white bg-neutral-800/50"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio - Compact */}
        <div>
          <p className="text-sm font-medium text-neutral-200 mb-2 flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            Ratio
          </p>
          <Tabs
            value={aspectRatio}
            onValueChange={(v) => setAspectRatio(v as AspectRatioType)}
          >
            <TabsList className="w-full bg-neutral-800 border border-neutral-700 h-9">
              {aspectRatios.map((ratio) => (
                <TabsTrigger
                  key={ratio.value}
                  value={ratio.value}
                  className="flex-1 text-xs font-medium text-neutral-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  {ratio.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-1" />

        {/* Export Button */}
        <Button
          onClick={onExport}
          disabled={isExporting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] font-semibold py-5 rounded-xl"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Copying...
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
