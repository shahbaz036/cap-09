import React from 'react';
import { Target, Users, Award } from 'lucide-react';

export default function AboutNests() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About NESTS</h2>
          
          <div className="prose prose-lg max-w-none text-gray-600 mb-12">
            <p className="mb-6">
              Eklavya Model Residential School (EMRS) is a Government of India scheme to establish model residential schools for Indian tribals (Scheduled Tribes and PVTGs) across India. It is one of the flagship interventions of the Ministry of Tribal Affairs, Government of India and was introduced in the year 1997-98 to ensure tribal students get access to quality education in the remote tribal areas. The Union Budget for 2018-19 announced that every block with more than 50% ST population and at least 20,000 tribal persons will have Eklavya Model Residential Schools.
            </p>
            <p className="mb-6">
              Eklavya Model Residential Schools are being developed to impart quality education to tribal students, with an emphasis on not only academic education but all-round development of tribal students. The schools cater to students from class VI to class XII, having a capacity of 480 students in each school. At present, there are 402 functional schools in which 123510 students are studying in these schools. EMRS schools were established at par with Navodaya Vidyalayas with focus on special state-of-the-art facilities for preserving local art and culture besides providing training in sports and skill development. Also, EMRSs are equipped with facilities catering to the students’ on-campus needs for holistic development and provide free education including boarding and lodging free of cost. The schools will be compliant to the provisions of the Right to Education Act, 2009 and other norms as prescribed by Central Board of Secondary Education (CBSE).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">
                Providing quality education to tribal students while preserving their cultural identity
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Impact</h3>
              <p className="text-gray-600">
                Transforming lives through education across 400+ EMRS schools nationwide
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Achievement</h3>
              <p className="text-gray-600">
                Consistently achieving excellence in academics and holistic development
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}