import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

import MemoryWordGame from "@/miryangspecial/memoryquiz/MemoryWordGame";
// import Alzheimer from "@/miryangspecial/alzheimer/Alzheimer";
// import AlzheimerResult from "@/miryangspecial/alzheimer/AlzheimerResult";
// import CognitiveSurvey from "@/miryangspecial/cognitiveSurvey/CognitiveSurvey";
// import CognitiveResult from "@/miryangspecial/cognitiveSurvey/CognitiveResult";
// import DepressionSurvey from "./depression/DepressionSurvey";
// import DepressionResult from "./depression/DepressionResult";
import StressSurvey from "./stress/StressSurvey";
import StressResult from "./stress/StressResult";
import SleepSurvey from "./sleep/SleepSurvey";
import SleepResult from "./sleep/SleepResult";
import OlderGuide from "./guide/OlderGuide";
import PigIndex from "./pig_cog_game/PigIndex";

export default function MiryangLayout() {
  return (
    <Routes>
      <Route
        path="pigcoggame"
        element={
          <ProtectedRoute>
            <PigIndex />
          </ProtectedRoute>
        }
      />

      <Route
        path="memorytest"
        element={
          <ProtectedRoute>
            <MemoryWordGame />
          </ProtectedRoute>
        }
      />
      {/* 
      <Route
        path="alzhemier"
        element={
          <ProtectedRoute>
            <Alzheimer />
          </ProtectedRoute>
        }
      />
      <Route
        path="alzhemier/result"
        element={
          <ProtectedRoute>
            <AlzheimerResult />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="cognitive"
        element={
          <ProtectedRoute>
            <CognitiveSurvey />
          </ProtectedRoute>
        }
      />
      <Route
        path="cognitive/result"
        element={
          <ProtectedRoute>
            <CognitiveResult />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="depression"
        element={
          <ProtectedRoute>
            <DepressionSurvey />
          </ProtectedRoute>
        }
      />
      <Route
        path="depression/result"
        element={
          <ProtectedRoute>
            <DepressionResult />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="stress"
        element={
          <ProtectedRoute>
            <StressSurvey />
          </ProtectedRoute>
        }
      />
      <Route
        path="stress/result"
        element={
          <ProtectedRoute>
            <StressResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="sleep"
        element={
          <ProtectedRoute>
            <SleepSurvey />
          </ProtectedRoute>
        }
      />
      <Route
        path="sleep/result"
        element={
          <ProtectedRoute>
            <SleepResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="older/guide"
        element={
          <ProtectedRoute>
            <OlderGuide />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
