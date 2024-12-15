import {
  ChevronDown,
  Redo,
  Undo,
  Scissors,
  Copy,
  Clipboard,
  Trash,
  ZoomIn,
  ZoomOut,
  ChevronDownIcon,
  Bot,
  Download,
  Save,
  ChevronUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import useStore from "../store/useStore";

export default function Topbar() {
  const {
    zoomLevel,
    zoomIn,
    zoomOut,
    setZoomLevel,
    fitView,
    shapesExpanded,
    toggleShapes,
    cutNodes,
    copyNodes,
    pasteNodes,
    deleteSelected,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useStore();

  // Check if canvas is empty or the image is not set
  const isCanvasEmpty = () => {
    const canvas = document.querySelector("#image-to-download");
    // Check if the canvas is empty or doesn't contain a valid image
    return !canvas || !canvas.src || canvas.src === "";
  };

  const downloadImage = () => {
    const image = document.querySelector("#image-to-download");
    if (image && image.src) {
      const link = document.createElement("a");
      link.href = image.src;
      link.download = "architecture-diagram.png";
      link.click();
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 rounded-lg shadow-md">
      {/* Left Section */}
      <div className="flex items-center space-x-4 max-w-fit flex-wrap">
        {/* Shapes toggle */}
        <Button
          variant="ghost"
          onClick={toggleShapes}
          aria-label={shapesExpanded ? "Collapse shapes" : "Expand shapes"}
          className="text-sm md:text-base"
        >
          Shapes
          {shapesExpanded ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </Button>

        <Separator orientation="vertical" className="h-8 hidden md:block" />

        {/* Action buttons */}
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={undo}
            disabled={!canUndo()}
            className="hidden sm:flex"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={redo}
            disabled={!canRedo()}
            className="hidden sm:flex"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8 hidden md:block" />

        {/* Cut, Copy, Paste, Delete */}
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={cutNodes}>
            <Scissors className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={copyNodes}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={pasteNodes}>
            <Clipboard className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={deleteSelected}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8 hidden md:block" />

        {/* Zoom controls */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                {zoomLevel === "fit" ? "Fit" : `${zoomLevel}%`}{" "}
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setZoomLevel(25)}>25%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoomLevel(50)}>50%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoomLevel(75)}>75%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoomLevel(100)}>100%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoomLevel(150)}>150%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoomLevel(200)}>200%</DropdownMenuItem>
              <DropdownMenuItem onSelect={fitView}>Fit to Screen</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-2">
        <img src="/logo.svg?height=32&width=32" alt="Clouditecture Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
        <h1 className="text-lg font-bold hidden sm:block">Clouditecture</h1>
      </div>

      {/* Buttons on the right */}
      <div className="max-w-fit gap-4 flex flex-row justify-between items-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center px-3 py-1.5 rounded-md">
          <Bot className="mr-2 h-4 w-4" />
          AI Assistant
        </button>
        <button
          className={`flex items-center px-3 py-1.5 border border-gray-300 rounded-md ${
            isCanvasEmpty() ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
          onClick={downloadImage}
          disabled={isCanvasEmpty()} // Disable when canvas is empty
        >
          <Download className="h-4 w-4 mr-2" />
          Save/Download
        </button>
      </div>
    </div>
  );
}
