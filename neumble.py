import numpy as np

R = 8.314 # universal gas constant [ J * K^(-1) * mol^(-1) ]
F = 96485 # Faraday constant [ C * mol^(-1) ]
body_temperature = 310 # [K]

# compute the nernst potetial (aka equilibrium potential, reversal potential) for a given ion [V]
def nernst_simple(valence, concentration_out, concentration_in, temperature=body_temperature):
    return R * temperature * ( valence * F )**(-1) * np.log( concentration_out / concentration_in )
