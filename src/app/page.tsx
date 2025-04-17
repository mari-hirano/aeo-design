"use client";

import { MainContent } from '@/components/MainContent';
import { useNavigator } from '@/context/NavigatorContext';

export default function Home() {
  const { selectedFile } = useNavigator();

  return <MainContent selectedFile={selectedFile} />;
}
