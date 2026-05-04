-- ============================================================
-- ScholarArena ORQE — Seed Data
-- Science 4th Grade & Under exam
-- 
-- ⚠️  ANSWER KEY: Answers marked with "-- CONFIRM" are
--     best-guess from question context. MUST be verified
--     against the official IAC answer key before going live.
--     Image-only questions (no text context) are marked
--     -- IMAGE: CONFIRM with IAC.
-- ============================================================

-- 1. Insert the exam row (inactive until window is set)
INSERT INTO exams (id, subject, grade_band, attempt_type, time_limit_minutes, pass_threshold, active)
VALUES (
  'aaaaaaaa-0001-0000-0000-000000000001',
  'science',
  '4th_under',
  'first',
  20,
  0.70,
  false  -- set to true via admin dashboard when ready to open
)
ON CONFLICT (subject, grade_band, attempt_type) DO NOTHING;

-- 2. Insert all 50 questions
-- Format: (exam_id, position, prompt, image_url, option_a, option_b, option_c, option_d, correct_option)

DO $$
DECLARE
  v_exam_id uuid := 'aaaaaaaa-0001-0000-0000-000000000001';
BEGIN

INSERT INTO questions (exam_id, position, prompt, image_url, option_a, option_b, option_c, option_d, correct_option) VALUES

-- Q1 (image)
(v_exam_id, 1,
 'The animal shown here can be described by what term?',
 'https://images.unsplash.com/photo-1517369428076-d7a1fc6acb9e?auto=format&fit=crop&w=1200&q=80',
 'Decomposer', 'Predator', 'Amphibian', 'Extraterrestrial',
 'c'), -- IMAGE: CONFIRM with IAC

-- Q2
(v_exam_id, 2,
 'What physical quantity can be measured using Celsius and Fahrenheit scales?',
 NULL,
 'Temperature', 'Electric current', 'Shape', 'Power',
 'a'),

-- Q3
(v_exam_id, 3,
 'What astronomical body is at the center of the Earth''s solar system?',
 NULL,
 'Mercury', 'The Sun', 'Alpha Centauri', 'Light Speed',
 'b'),

-- Q4
(v_exam_id, 4,
 'From what do plants obtain their energy?',
 NULL,
 'Moonlight', 'Snow', 'Sunlight', 'Sound',
 'c'),

-- Q5 (image)
(v_exam_id, 5,
 'What biological process is depicted in the image provided?',
 'https://images.unsplash.com/photo-1490814525860-594e82bfd34a?auto=format&fit=crop&w=1200&q=80',
 'Food cycle', 'Evolution', 'Metamorphosis', 'Molting',
 'c'), -- IMAGE: CONFIRM with IAC

-- Q6 (image)
(v_exam_id, 6,
 'Which national bird of the USA is shown here?',
 'https://images.unsplash.com/photo-1454991727061-be514eae86f7?auto=format&fit=crop&w=1200&q=80',
 'Northern Cardinal', 'Blue Jay', 'Osprey', 'Bald Eagle',
 'd'), -- IMAGE: CONFIRM with IAC

-- Q7
(v_exam_id, 7,
 'Which of the five senses are used to process sound?',
 NULL,
 'Touch', 'Hearing', 'Smell', 'Leaves',
 'b'),

-- Q8 (image)
(v_exam_id, 8,
 'What object was the Apollo Program''s goal to reach?',
 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=1200&q=80',
 'The Moon', 'The Sun', 'Mount Everest', 'Mars',
 'a'),

-- Q9
(v_exam_id, 9,
 'Which of the following is a polygon?',
 NULL,
 'Square', 'Sphere', 'Line segment', 'Dimension',
 'a'),

-- Q10 (image)
(v_exam_id, 10,
 'What branch of science studies fossils and prehistoric life?',
 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1200&q=80',
 'Psychology', 'Oceanography', 'Astronomy', 'Paleontology',
 'd'),

-- Q11 (image)
(v_exam_id, 11,
 'What molecule with a double-helix carries the genetic information of living creatures?',
 'https://images.unsplash.com/photo-1516571748831-5d81767b788d?auto=format&fit=crop&w=1200&q=80',
 'Cycling', 'Sugar', 'Insulin', 'DNA',
 'd'),

-- Q12
(v_exam_id, 12,
 'Which of the following is an element?',
 NULL,
 'Proton', 'Oxygen', 'Mass', 'Physics',
 'b'),

-- Q13 (image)
(v_exam_id, 13,
 'What astronomical object is depicted in the image provided?',
 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=80',
 'Asteroid', 'Star', 'Constellation', 'Oort Cloud',
 'c'), -- IMAGE: CONFIRM with IAC

-- Q14
(v_exam_id, 14,
 'Which of the following numbers is a prime number?',
 NULL,
 '100', '12', '3', 'Pi',
 'c'),

-- Q15
(v_exam_id, 15,
 'Which of the following animals is an invertebrate?',
 NULL,
 'Ostrich', 'Shark', 'Centipede', 'Horse',
 'c'),

-- Q16
(v_exam_id, 16,
 'Which of the following is a bone in the human body?',
 NULL,
 'Femur', 'Bicep', 'Heart', 'Liver',
 'a'),

-- Q17 (image)
(v_exam_id, 17,
 'Which of the following metrics is measured by a graduated cylinder?',
 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1200&q=80',
 'Color', 'Mass', 'Volume', 'Speed',
 'c'),

-- Q18
(v_exam_id, 18,
 'Which planet, the fourth from the Sun, is known as the Red Planet?',
 NULL,
 'Saturn', 'Mars', 'Earth', 'Vulcan',
 'b'),

-- Q19
(v_exam_id, 19,
 'Which of the following shapes has three sides?',
 NULL,
 'Triangle', 'Parabola', 'Circle', 'Pentagon',
 'a'),

-- Q20
(v_exam_id, 20,
 'What insects in the family Formicidae live in colonies and can be a problem at picnics?',
 NULL,
 'Flower', 'Dragonfly', 'Spider', 'Ants',
 'd'),

-- Q21 (image)
(v_exam_id, 21,
 'Animals, such as the dingo and kangaroo, are primarily found in what region?',
 'https://images.unsplash.com/photo-1502780402662-acc01c084a25?auto=format&fit=crop&w=1200&q=80',
 'Antarctica', 'Amazon', 'Himalayas', 'Australia',
 'd'),

-- Q22 (image)
(v_exam_id, 22,
 'Dmitri Mendeleev is credited with creating a table organizing what objects?',
 'https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1200&q=80',
 'Dinosaurs', 'The stars', 'The chemical elements', 'Toys',
 'c'),

-- Q23
(v_exam_id, 23,
 'Edwin Hubble names what kind of instrument that is orbiting earth and looks into deep space?',
 NULL,
 'Telescope', 'Orthoscope', 'Oscilloscope', 'Kaleidoscope',
 'a'),

-- Q24
(v_exam_id, 24,
 'Which of the following organs is part of the respiratory system?',
 NULL,
 'Lungs', 'Brain', 'Skin', 'Small intestine',
 'a'),

-- Q25 (image)
(v_exam_id, 25,
 'The mountain shown here is an example of a what?',
 'https://images.unsplash.com/photo-1485736982040-28ae1d52881d?auto=format&fit=crop&w=1200&q=80',
 'Volcano', 'Fault', 'Delta', 'Hurricane',
 'a'), -- IMAGE: CONFIRM with IAC

-- Q26 (image)
(v_exam_id, 26,
 'What is indicated by the H on this weather map?',
 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
 'Hurricanes', 'Hail', 'High Pressure', 'Hydrogen',
 'c'),

-- Q27
(v_exam_id, 27,
 'Which of the following elements is a metal?',
 NULL,
 'Fluorine', 'Iron', 'Helium', 'Byzantium',
 'b'),

-- Q28 (image)
(v_exam_id, 28,
 'What event is depicted in the image provided?',
 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=80',
 'Supernova', 'Cell division', 'Blizzard', 'Aurora borealis',
 'd'), -- IMAGE: CONFIRM with IAC

-- Q29 (image — perimeter)
(v_exam_id, 29,
 'What is the perimeter of the shape in the image provided?',
 'https://images.unsplash.com/photo-1496070242169-b672c576566b?auto=format&fit=crop&w=1200&q=80',
 '10', '5.4', '1 million', '47',
 'a'), -- IMAGE: CONFIRM with IAC — cannot determine without seeing shape

-- Q30
(v_exam_id, 30,
 'Which of the following animals is a monotreme, a mammal that can lay eggs?',
 NULL,
 'Salamander', 'Cow', 'Robin', 'Platypus',
 'd'),

-- Q31 (image)
(v_exam_id, 31,
 'What structures are depicted in the image provided?',
 'https://images.unsplash.com/photo-1516537219851-920e2670c6e3?auto=format&fit=crop&w=1200&q=80',
 'Chromosomes', 'Planets', 'Constellations', 'Trees',
 'a'), -- IMAGE: CONFIRM with IAC

-- Q32
(v_exam_id, 32,
 'What powdery substance do bees collect from flowers as food?',
 NULL,
 'Uranium', 'Salt', 'Pollen', 'Antioxidants',
 'c'),

-- Q33 (image)
(v_exam_id, 33,
 'What group of stars is depicted in the image provided?',
 'https://images.unsplash.com/photo-1454789476662-53eb23ba5907?auto=format&fit=crop&w=1200&q=80',
 'Canis Major', 'Big Dipper', 'Orion', 'Betelgeuse',
 'b'), -- IMAGE: CONFIRM with IAC

-- Q34
(v_exam_id, 34,
 'Which fraction is equivalent to 50 percent?',
 NULL,
 '25/1', '1/2', '8/4', '1 1/2',
 'b'),

-- Q35 (image)
(v_exam_id, 35,
 'What harmful process is depicted in the image provided?',
 'https://images.unsplash.com/photo-1475776408506-9a5371e7a068?auto=format&fit=crop&w=1200&q=80',
 'Overfishing', 'Plastic pollution', 'Ozone depletion', 'Coral bleaching',
 'd'), -- IMAGE: CONFIRM with IAC

-- Q36
(v_exam_id, 36,
 'Edmond Halley names what kind of object with a tail, which will be seen in the inner Solar System again in 2061?',
 NULL,
 'Meteorite', 'Comet', 'Planet', 'Monkey',
 'b'),

-- Q37 (image)
(v_exam_id, 37,
 'What chemical element is often used to illuminate electric signs?',
 'https://images.unsplash.com/photo-1499578124509-1611b77778c8?auto=format&fit=crop&w=1200&q=80',
 'Neon', 'Radon', 'Lithium', 'Carbon',
 'a'),

-- Q38
(v_exam_id, 38,
 'Which of the following is a type of star classification?',
 NULL,
 'Red dwarf', 'Cumulus', 'Delta', 'Mega-Earth',
 'a'),

-- Q39 (image)
(v_exam_id, 39,
 'Which of the following is a true statement about the animal shown here?',
 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80',
 'It only lives in the Arctic Ocean', 'It''s a type of whale', 'It''s cold-blooded', 'It mostly eats insects',
 'b'), -- IMAGE: CONFIRM with IAC

-- Q40 (image)
(v_exam_id, 40,
 'What natural disaster is measured with a seismograph?',
 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80',
 'Wave height', 'Earthquake', 'Flood', 'Global warming',
 'b'),

-- Q41
(v_exam_id, 41,
 'What biological structures, the basic units of life, are divided in mitosis and meiosis?',
 NULL,
 'Bacteria', 'Cells', 'Tissue', 'Ears',
 'b'),

-- Q42
(v_exam_id, 42,
 'What process occurs when a solid transforms into a liquid?',
 NULL,
 'Sublimation', 'Splashing', 'Freezing', 'Melting',
 'd'),

-- Q43 (image)
(v_exam_id, 43,
 'What phase of the moon is depicted in the image provided?',
 'https://images.unsplash.com/photo-1500350347612-85b7eff2f759?auto=format&fit=crop&w=1200&q=80',
 'Full moon', 'Third quarter', 'New moon', 'Blue Moon',
 'b'), -- IMAGE: CONFIRM with IAC

-- Q44 (image)
(v_exam_id, 44,
 'Which of these men was a scientist who described the theory of evolution?',
 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?auto=format&fit=crop&w=1200&q=80',
 'Charles Darwin', 'Albert Einstein', 'Neil deGrasse Tyson', 'Stephen Hawking',
 'a'), -- IMAGE: CONFIRM with IAC

-- Q45 (image)
(v_exam_id, 45,
 'What weather phenomenon is depicted in the image provided?',
 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?auto=format&fit=crop&w=1200&q=80',
 'Hurricane', 'Tornado', 'Cumulus', 'Blizzard',
 'b'), -- IMAGE: CONFIRM with IAC

-- Q46
(v_exam_id, 46,
 'What organ system contains the small and large intestines?',
 NULL,
 'Nervous system', 'Digestive system', 'Binary system', 'Skeletal system',
 'b'),

-- Q47
(v_exam_id, 47,
 'Which of the following biomes is best at storing carbon?',
 NULL,
 'Urban', 'Savannah', 'Rainforest', 'Desert',
 'c'),

-- Q48
(v_exam_id, 48,
 'What force pulls things towards the center of the Earth?',
 NULL,
 'Gravity', 'Planck', 'Drag', 'Mass',
 'a'),

-- Q49
(v_exam_id, 49,
 'Which of these fruits is the best source of Vitamin C?',
 NULL,
 'Carrot', 'Apple', 'Banana', 'Orange',
 'd'),

-- Q50 (image)
(v_exam_id, 50,
 'What carnivorous plant is depicted in the image provided?',
 'https://images.unsplash.com/photo-1486578077620-8a022ddd481f?auto=format&fit=crop&w=1200&q=80',
 'Venus flytrap', 'Nutmeg', 'Banyan', 'Magnolia',
 'a') -- IMAGE: CONFIRM with IAC

ON CONFLICT (exam_id, position) DO NOTHING;

END $$;
