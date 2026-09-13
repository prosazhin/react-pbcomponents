'use client';

import Content from '@/components/helpers/content';
import Badge, { BadgeProps } from '@/components/shared/badge';
import Input from '@/components/shared/input';
import { ErrorType, InputHTMLAttrs, SelectDropdownOptionType, SMSizeType, WrapperClassNameType } from '@/types';
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'motion/react';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';

import useClickOutside from '@/hooks/use-click-outside';
import useKeydown from '@/hooks/use-keydown';

type SearchOptionType = SelectDropdownOptionType<ReactElement<BadgeProps>>;
type SearchSingleProps = {
  multiple?: false;
  value?: SearchOptionType;
  defaultValue?: SearchOptionType;
  onChange?: (value: SearchOptionType | undefined) => void;
};
type SearchMultipleProps = {
  multiple: true;
  value?: SearchOptionType[];
  defaultValue?: SearchOptionType[];
  onChange?: (value: SearchOptionType[]) => void;
};

type BaseSearchProps = Omit<InputHTMLAttrs, 'onChange' | 'value' | 'size' | 'type' | 'children'> &
  SMSizeType &
  ErrorType &
  WrapperClassNameType;

const normalizeSelection = (value: SearchOptionType | SearchOptionType[] | undefined): SearchOptionType[] => {
  if (value === undefined) return [];
  if (Array.isArray(value)) return [...value];

  return [value];
};
const getOptionKey = (option: SearchOptionType) => option.value ?? option.display;
const selectionToLabel = (selection: SearchOptionType[]) => selection.map(({ display }) => display).join(', ');

export type SearchProps = BaseSearchProps & {
  className?: string;
  options: SearchOptionType[];
  dropdownClassName?: string;
  dropdownItemClassName?: string;
} & (SearchSingleProps | SearchMultipleProps);

const Search = (props: SearchProps) => {
  const multiple = props.multiple === true;
  const isControlled = props.value !== undefined;

  const {
    size = 'm',
    error = false,
    disabled = false,
    placeholder,
    options,
    className,
    wrapperClassName,
    dropdownClassName,
    dropdownItemClassName,
    value: _value,
    defaultValue: _defaultValue,
    onChange: _onChange,
    ...rest
  } = props;
  void _value;
  void _defaultValue;
  void _onChange;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selected, setSelected] = useState<SearchOptionType[]>(() => normalizeSelection(props.defaultValue));

  useClickOutside({ refs: [dropdownRef, inputRef], callback: () => setOpen(false) });
  useKeydown({ keys: ['Escape'], callback: () => setOpen(false) });

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    if (!isControlled) return;

    setSelected(normalizeSelection(props.value));
  }, [isControlled, props.value]);

  function handleChange(option: SearchOptionType) {
    const optionKey = getOptionKey(option);
    const isSelected = selected.some((item) => getOptionKey(item) === optionKey);
    let result: SearchOptionType[] = [...selected];

    if (isSelected) {
      if (multiple) {
        result = result.filter((item) => getOptionKey(item) !== optionKey);
      } else {
        result = [];
      }
    } else {
      if (multiple) {
        result.push(option);
      } else {
        result = [option];
      }
    }

    if (!isControlled) {
      setSelected(result);
    }

    if (multiple) {
      (props.onChange as SearchMultipleProps['onChange'])?.(result);
    } else {
      (props.onChange as SearchSingleProps['onChange'])?.(result[0]);
    }

    setOpen(false);
  }

  const filteredOptions = useMemo(
    () => (query === '' ? options : options.filter((item: SearchOptionType) => item.display.toLowerCase().includes(query.toLowerCase()))),
    [options, query],
  );
  const value = useMemo(() => selectionToLabel(selected), [selected]);

  return (
    <div className={clsx('pbc pbc:relative pbc:w-full', wrapperClassName)}>
      <Input size={size} error={error} disabled={disabled} className={className}>
        <Input.Control
          {...rest}
          ref={inputRef}
          value={open ? query : value}
          type='search'
          placeholder={placeholder}
          leftIcon={MagnifyingGlassIcon}
          rightIcon={undefined}
          onClick={() => setOpen(true)}
          onFocus={() => setOpen(true)}
          onChange={(v: string) => {
            setOpen(true);
            setQuery(v);
          }}
        />
      </Input>
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              ref={dropdownRef}
              className={clsx(
                'pbc:absolute pbc:inset-x-0 pbc:mx-auto pbc:z-10 pbc:box-border pbc:w-full pbc:max-h-309 pbc:bottom-0 pbc:translate-y-[calc(100%+6px)]',
                'pbc:bg-basic-0 pbc:rounded-16 pbc:border pbc:border-solid pbc:border-secondary-100 pbc:p-8 pbc-scrollbar-hidden pbc:overflow-y-auto',
                dropdownClassName,
              )}
              initial={{ opacity: 0, bottom: 6 }}
              animate={{ opacity: 1, bottom: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
              exit={{ opacity: 0, bottom: 6, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              <ul className='pbc:flex pbc:flex-col pbc:list-none pbc:m-0 pbc:p-0'>
                {filteredOptions.map((item, index) => {
                  const { display, disabled: disabledItem, badge } = item;
                  const key = getOptionKey(item);

                  return (
                    <li key={`${key}-${index}`} className='pbc:w-full'>
                      <button
                        className={clsx(
                          'pbc pbc:w-full pbc:flex pbc:flex-row pbc:items-center pbc:gap-8 pbc:px-20 pbc:py-12 pbc:cursor-pointer pbc:transition-colors pbc:duration-150 pbc:rounded-12 pbc:max-h-48',
                          'pbc:bg-transparent pbc:text-text-primary pbc:hover:bg-secondary-100',
                          disabledItem && 'pbc:cursor-default! pbc:text-text-secondary! pbc:bg-transparent!',
                          dropdownItemClassName,
                        )}
                        type='button'
                        disabled={disabledItem}
                        aria-disabled={disabledItem}
                        onClick={() => handleChange(item)}
                      >
                        <Content
                          size='m'
                          className={clsx('pbc:w-full pbc:text-left')}
                          leftIcon={CheckIcon}
                          leftIconClassName={clsx(
                            'pbc:invisible pbc:text-primary-400',
                            selected.some((i) => getOptionKey(i) === key) && 'pbc:visible!',
                            disabledItem && 'pbc:text-text-secondary!',
                          )}
                        >
                          {display}
                        </Content>
                        {badge && <Badge {...badge.props} size='s' />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

Search.displayName = 'Search';
export default Search;
