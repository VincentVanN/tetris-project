import PropTypes from 'prop-types';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { useCallback, useMemo } from 'react';

function ParticlesComponent({ optionParticles }) {
  const options = useMemo(() => (optionParticles), []);
  const particlesInit = useCallback((engine) => {
    loadFull(engine);
  }, []);
  return (
    <Particles init={particlesInit} options={options} />
  );
}
ParticlesComponent.propTypes = {
  optionParticles: PropTypes.object.isRequired,
};

export default ParticlesComponent;
