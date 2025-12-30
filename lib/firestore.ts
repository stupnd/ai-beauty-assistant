import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export type AnalysisRecord = {
  photoUrl: string;
  answers: {
    skinType: string;
    concern: string;
    budget: string;
    sensitive: boolean;
  };
  recommendations: {
    headline: string;
    routineAM: { step: string; why: string }[];
    routinePM: { step: string; why: string }[];
    ingredientsToLookFor: string[];
    ingredientsToAvoid: string[];
    productIdeas: { name: string; category: string; note: string }[];
  };
};

export async function saveAnalysis(record: AnalysisRecord) {
  const ref = await addDoc(collection(db, "analyses"), {
    ...record,
    createdAt: serverTimestamp(),
  });

  return ref.id;
}
