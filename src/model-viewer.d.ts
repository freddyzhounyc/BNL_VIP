import type { ModelViewerElement } from '@google/model-viewer';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type ModelViewerProps = DetailedHTMLProps<HTMLAttributes<ModelViewerElement>, ModelViewerElement> & {
  // Loading
  src?: string;
  alt?: string;
  poster?: string;
  loading?: 'auto' | 'lazy' | 'eager';
  reveal?: 'auto' | 'manual';
  'with-credentials'?: boolean;

  // Augmented reality
  ar?: boolean;
  'ar-modes'?: string;
  'ar-scale'?: 'auto' | 'fixed';
  'ar-placement'?: 'floor' | 'wall';
  'ios-src'?: string;
  'xr-environment'?: boolean;

  // Camera & interaction
  'camera-controls'?: boolean;
  'disable-pan'?: boolean;
  'disable-tap'?: boolean;
  'disable-zoom'?: boolean;
  'touch-action'?: 'pan-y' | 'pan-x' | 'none';
  'orbit-sensitivity'?: number | string;
  'auto-rotate'?: boolean;
  'auto-rotate-delay'?: number | string;
  'rotation-per-second'?: string;
  'interaction-prompt'?: 'auto' | 'none';
  'interaction-prompt-style'?: 'basic' | 'wiggle';
  'interaction-prompt-threshold'?: number | string;
  'camera-orbit'?: string;
  'camera-target'?: string;
  'field-of-view'?: string;
  'max-camera-orbit'?: string;
  'min-camera-orbit'?: string;
  'max-field-of-view'?: string;
  'min-field-of-view'?: string;
  'interpolation-decay'?: number | string;
  bounds?: 'tight' | 'legacy';

  // Lighting & environment
  'environment-image'?: string;
  'skybox-image'?: string;
  'skybox-height'?: string;
  exposure?: number | string;
  'tone-mapping'?: 'auto' | 'commerce' | 'neutral' | 'agx';
  'shadow-intensity'?: number | string;
  'shadow-softness'?: number | string;

  // Animation
  autoplay?: boolean;
  'animation-name'?: string;
  'animation-crossfade-duration'?: number | string;

  // Scene / materials
  'variant-name'?: string;
  orientation?: string;
  scale?: string;

  // Hotspots
  'min-hotspot-opacity'?: number | string;
  'max-hotspot-opacity'?: number | string;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerProps;
    }
  }
}
