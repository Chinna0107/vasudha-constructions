import { useState, useEffect, useRef, useCallback } from 'react';
import { API_URL } from '../config';

const cache = new Map();

const API = API_URL;
const token = () => localStorage.getItem('vasudha_token');

export function useFetch(path, { skip = false } = {}) {
  const url = path ? `${API}${path}` : null;
  const [data, setData] = useState(() => cache.get(url) ?? undefined);
  const [loading, setLoading] = useState(!cache.has(url) && !skip && !!url);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const run = useCallback(async (silent = false) => {
    if (!url) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    if (!silent) setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token()}` },
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const json = await res.json();
      cache.set(url, json);
      setData(json);
    } catch (e) {
      if (e.name !== 'AbortError') setError(e.message);
    } finally {
      if (!ctrl.signal.aborted) setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (skip || !url) return;
    if (cache.has(url)) { setData(cache.get(url)); setLoading(false); }
    run(cache.has(url)); // silent refresh if cached
    return () => abortRef.current?.abort();
  }, [url, skip]);

  const refetch = () => { cache.delete(url); run(); };

  return { data, loading, error, refetch };
}

export function invalidateCache(path) {
  const url = `${API}${path}`;
  cache.delete(url);
}
